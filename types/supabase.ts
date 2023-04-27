export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          icon: Json | null;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          icon?: Json | null;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          icon?: Json | null;
          id?: string;
          name?: string;
          slug?: string;
        };
      };
      installations: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          images: Json | null;
          productId: string | null;
          title: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: Json | null;
          productId?: string | null;
          title?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          images?: Json | null;
          productId?: string | null;
          title?: string | null;
        };
      };
      products: {
        Row: {
          categoryId: string;
          created_at: string;
          description: string | null;
          fromPrice: number | null;
          id: string;
          mainImage: Json | null;
          name: string;
          price: number | null;
          quantity: number | null;
          shopId: string | null;
          slug: string;
          variants: Json | null;
        };
        Insert: {
          categoryId: string;
          created_at?: string;
          description?: string | null;
          fromPrice?: number | null;
          id?: string;
          mainImage?: Json | null;
          name: string;
          price?: number | null;
          quantity?: number | null;
          shopId?: string | null;
          slug: string;
          variants?: Json | null;
        };
        Update: {
          categoryId?: string;
          created_at?: string;
          description?: string | null;
          fromPrice?: number | null;
          id?: string;
          mainImage?: Json | null;
          name?: string;
          price?: number | null;
          quantity?: number | null;
          shopId?: string | null;
          slug?: string;
          variants?: Json | null;
        };
      };
      shops: {
        Row: {
          address: string | null;
          city: string | null;
          country: string | null;
          created_at: string | null;
          email: string | null;
          googleMapsUrl: string | null;
          id: string;
          image: Json | null;
          openHours: Json | null;
          phoneNumber: string | null;
          postalCode: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          email?: string | null;
          googleMapsUrl?: string | null;
          id?: string;
          image?: Json | null;
          openHours?: Json | null;
          phoneNumber?: string | null;
          postalCode?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          country?: string | null;
          created_at?: string | null;
          email?: string | null;
          googleMapsUrl?: string | null;
          id?: string;
          image?: Json | null;
          openHours?: Json | null;
          phoneNumber?: string | null;
          postalCode?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
