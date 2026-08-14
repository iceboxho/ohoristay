export type Database = {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          capacity: number;
          weekday_price: number | null;
          holiday_price: number | null;
          extra_person_price: number | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          capacity: number;
          weekday_price?: number | null;
          holiday_price?: number | null;
          extra_person_price?: number | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rooms"]["Insert"]>;
        Relationships: [];
      };
      bookings: {
        Row: {
          id: string;
          room_id: string | null;
          check_in_date: string;
          check_out_date: string;
          guests: number;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          line_id: string | null;
          note: string | null;
          status: "pending" | "confirmed" | "cancelled" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          room_id?: string | null;
          check_in_date: string;
          check_out_date: string;
          guests: number;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          line_id?: string | null;
          note?: string | null;
          status?: "pending" | "confirmed" | "cancelled" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "bookings_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_users: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [];
      };
      news: {
        Row: { id: string; title: string; content: string; published_at: string | null; is_published: boolean; created_at: string; updated_at: string };
        Insert: { id?: string; title: string; content: string; published_at?: string | null; is_published?: boolean; created_at?: string; updated_at?: string };
        Update: { id?: string; title?: string; content?: string; published_at?: string | null; is_published?: boolean; created_at?: string; updated_at?: string };
        Relationships: [];
      };
      site_settings: {
        Row: { id: string; site_name: string | null; phone: string | null; email: string | null; line_url: string | null; facebook_url: string | null; instagram_url: string | null; address: string | null; google_map_url: string | null; created_at: string; updated_at: string };
        Insert: { id?: string; site_name?: string | null; phone?: string | null; email?: string | null; line_url?: string | null; facebook_url?: string | null; instagram_url?: string | null; address?: string | null; google_map_url?: string | null; created_at?: string; updated_at?: string };
        Update: { id?: string; site_name?: string | null; phone?: string | null; email?: string | null; line_url?: string | null; facebook_url?: string | null; instagram_url?: string | null; address?: string | null; google_map_url?: string | null; created_at?: string; updated_at?: string };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      is_admin: { Args: Record<never, never>; Returns: boolean };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
