import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found — Veritas Tax AI";
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <img src="/veritas-mark.png" alt="Veritas Global AI" className="mb-6 h-14 w-14 object-contain" />
      <div className="brand-eyebrow">404</div>
      <h1 className="mt-2 text-4xl font-semibold">Page not found</h1>
      <div className="section-rule mx-auto mt-4" />
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The page <code className="rounded bg-paper-2 px-1.5 py-0.5 text-ink">{location.pathname}</code>{" "}
        doesn’t exist. Return to your dashboard to keep working.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-navy px-6 py-3 text-sm font-medium text-paper transition hover:bg-navy-deep"
      >
        Return to dashboard
      </Link>
    </div>
  );
};

export default NotFound;
