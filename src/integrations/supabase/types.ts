export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_configuration: {
        Row: {
          created_at: string | null
          id: string
          key_name: string
          key_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_name: string
          key_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key_name?: string
          key_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          api_key: string
          created_at: string | null
          id: string
          service: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: string
          service: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: string
          service?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      case_files: {
        Row: {
          case_id: string | null
          file_path: string
          file_size: number
          file_type: string
          id: string
          name: string
          uploaded_at: string
        }
        Insert: {
          case_id?: string | null
          file_path: string
          file_size: number
          file_type: string
          id?: string
          name: string
          uploaded_at?: string
        }
        Update: {
          case_id?: string | null
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          name?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_files_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_links: {
        Row: {
          added_at: string
          case_id: string | null
          description: string | null
          id: string
          title: string
          url: string
        }
        Insert: {
          added_at?: string
          case_id?: string | null
          description?: string | null
          id?: string
          title: string
          url: string
        }
        Update: {
          added_at?: string
          case_id?: string | null
          description?: string | null
          id?: string
          title?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_links_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_notes: {
        Row: {
          case_id: string | null
          content: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          case_id?: string | null
          content: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          case_id?: string | null
          content?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_notes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      case_timeline: {
        Row: {
          case_id: string | null
          created_at: string | null
          description: string | null
          event_date: string
          event_type: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          case_id?: string | null
          created_at?: string | null
          description?: string | null
          event_date: string
          event_type?: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          case_id?: string | null
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_type?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_timeline_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          case_id: string | null
          content: string
          conversation_thread_id: string | null
          created_at: string
          id: string
          is_user: boolean
          message_type: string | null
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          case_id?: string | null
          content: string
          conversation_thread_id?: string | null
          created_at?: string
          id?: string
          is_user?: boolean
          message_type?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          case_id?: string | null
          content?: string
          conversation_thread_id?: string | null
          created_at?: string
          id?: string
          is_user?: boolean
          message_type?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          created_at: string | null
          date: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string
          status: string | null
          time: string
        }
        Insert: {
          created_at?: string | null
          date: string
          email: string
          full_name: string
          id?: string
          message: string
          phone: string
          status?: string | null
          time: string
        }
        Update: {
          created_at?: string | null
          date?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string
          status?: string | null
          time?: string
        }
        Relationships: []
      }
      file_attachments: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number
          id: string
          submission_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size: number
          id?: string
          submission_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_attachments_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "service_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_cases: {
        Row: {
          created_at: string
          description: string | null
          id: string
          priority: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      legal_templates: {
        Row: {
          category: string
          content: string
          created_at: string
          description: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          description?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          description?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_transformations: {
        Row: {
          created_at: string
          downloaded: boolean
          id: string
          model_id: string
          original_file_name: string
          original_file_path: string
          price: number
          processed_file_path: string
          prompt: string
          purchased: boolean
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          downloaded?: boolean
          id?: string
          model_id: string
          original_file_name: string
          original_file_path: string
          price: number
          processed_file_path: string
          prompt: string
          purchased?: boolean
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          downloaded?: boolean
          id?: string
          model_id?: string
          original_file_name?: string
          original_file_path?: string
          price?: number
          processed_file_path?: string
          prompt?: string
          purchased?: boolean
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          status?: string | null
        }
        Relationships: []
      }
      payment_items: {
        Row: {
          created_at: string
          id: string
          payment_id: string
          price: number
          transformation_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          payment_id: string
          price: number
          transformation_id: string
        }
        Update: {
          created_at?: string
          id?: string
          payment_id?: string
          price?: number
          transformation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_items_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_items_transformation_id_fkey"
            columns: ["transformation_id"]
            isOneToOne: false
            referencedRelation: "media_transformations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_method: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_method?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      service_submissions: {
        Row: {
          country: string | null
          country_code: string | null
          created_at: string | null
          description: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone_country_code: string | null
          phone_number: string | null
          project_name: string
          quiz_score: number | null
          requirements: string
          service_name: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          description: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone_country_code?: string | null
          phone_number?: string | null
          project_name: string
          quiz_score?: number | null
          requirements: string
          service_name: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          country_code?: string | null
          created_at?: string | null
          description?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone_country_code?: string | null
          phone_number?: string | null
          project_name?: string
          quiz_score?: number | null
          requirements?: string
          service_name?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      case_qa_pairs: {
        Row: {
          answer: string | null
          answer_id: string | null
          answer_time: string | null
          case_id: string | null
          conversation_thread_id: string | null
          message_type: string | null
          question: string | null
          question_id: string | null
          question_time: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "legal_cases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
