# Self-hosted Supabase (OpenShip / homelab) — deployment runbook

The app is connected to the **OpenShip self-hosted Supabase stack** on the homelab
(`192.168.1.42`), not to a hosted Supabase project. This file documents exactly how that
connection is wired so it can be re-applied after a stack rebuild.

## Endpoints

| Piece | Value |
|---|---|
| Supabase API (Kong) | `http://192.168.1.42:8000` |
| Postgres | `192.168.1.42:5433` (user `postgres`) |
| Studio | `http://192.168.1.42:3003` |
| Anon (publishable) key | in Kong env `ANON_KEY`, also in `kong.yml` → `consumers.anon` |
| Docker network | `openship-supabase` |
| Config root | `/var/lib/openship/app-config/proj_JQsSyX0Y7-PzvYEK` |

The frontend reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`, defaulting to the
values in `src/integrations/supabase/client.ts`.

## Auth

GoTrue runs with `GOTRUE_MAILER_AUTOCONFIRM=true` and `GOTRUE_DISABLE_SIGNUP=false`, so
signups are confirmed instantly and return a session immediately — no SMTP needed.

## Database migrations

`supabase/migrations/*.sql` were applied directly to the stack's Postgres
(`profiles` table + `handle_new_user` trigger + RLS policies + backfill). To re-apply:

```bash
cat supabase/migrations/*.sql | ssh root@192.168.1.42 \
  'docker exec -i openship-supabase-db psql -U postgres -d postgres -v ON_ERROR_STOP=1'
```

## Edge functions (`/functions/v1/*`)

Supabase edge functions run in a dedicated container added to the stack:

- **Container**: `openship-supabase-functions` (image `supabase/edge-runtime:v1.77.4`)
- **Source of truth**: `supabase/selfhost/` (router + import map) and `supabase/functions/`
  (`tax-ai`, `tax-overview-summary`) in this repo
- **Mounted at**: `/var/lib/openship/app-config/proj_JQsSyX0Y7-PzvYEK/functions` →
  `/home/deno/functions`
- **Env**: `AI_BASE_URL` + `AI_API_KEY` + `AI_MODEL` (currently DeepSeek via
  `https://api.deepseek.com/v1`, key taken from
  `/opt/openship/releases/dep_g6etTEK5aJd8BNQt/.env.local`), plus `JWT_SECRET` from the
  Kong container and `VERIFY_JWT=false` (Kong enforces `key-auth`).

Re-create it after a rebuild (secrets are resolved on the host, never pasted):

```bash
BASE=/var/lib/openship/app-config/proj_JQsSyX0Y7-PzvYEK/functions
JWT=$(docker exec openship-supabase-kong printenv JWT_SECRET)
set -a; . /opt/openship/releases/dep_g6etTEK5aJd8BNQt/.env.local; set +a
docker rm -f openship-supabase-functions 2>/dev/null || true
docker run -d --name openship-supabase-functions --restart unless-stopped \
  --network openship-supabase \
  -v "$BASE":/home/deno/functions:ro \
  -e JWT_SECRET="$JWT" -e VERIFY_JWT=false \
  -e AI_BASE_URL=https://api.deepseek.com/v1 \
  -e AI_API_KEY="$DEEPSEEK_API_KEY" -e AI_MODEL=deepseek-chat \
  supabase/edge-runtime:v1.77.4 \
  start --user-worker-request-idle-timeout 150000 --main-service /home/deno/functions/main
```

## Kong route

`kong.yml` (host path
`/var/lib/openship/app-config/proj_JQsSyX0Y7-PzvYEK/kong/usr/local/kong/kong.yml`,
backups alongside it) has this service appended; Kong must be restarted after edits:

```yaml
  - name: functions-v1
    url: http://openship-supabase-functions:9000/
    routes:
      - name: functions-v1-all
        strip_path: true
        paths:
          - /functions/v1/
    plugins:
      - name: cors
      - name: key-auth
        config:
          hide_credentials: true
      - name: acl
        config:
          hide_groups_header: true
          allow:
            - authenticated
```

## Caveats

- The functions container is **not managed by OpenShip's project definition**. If OpenShip
  redeploys the Supabase stack, re-create the container and re-append the Kong route with the
  snippets above. The functions source itself is safe in this repo.
- AI provider is OpenAI-compatible and configurable per env — swap `AI_BASE_URL` / `AI_MODEL`
  to move to another provider without code changes.
