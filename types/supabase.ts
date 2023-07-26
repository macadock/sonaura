export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: 'installations_productId_fkey';
            columns: ['productId'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          billingAddress: Json;
          companyName: string | null;
          created_at: string;
          deliveryDate: string | null;
          deliveryShopId: string | null;
          email: string;
          firstName: string;
          id: string;
          lastName: string;
          paymentDate: string | null;
          paymentProvider: string | null;
          paymentStatus: string;
          phoneNumber: string;
          products: Json;
          status: string;
        };
        Insert: {
          billingAddress: Json;
          companyName?: string | null;
          created_at?: string;
          deliveryDate?: string | null;
          deliveryShopId?: string | null;
          email: string;
          firstName?: string;
          id?: string;
          lastName?: string;
          paymentDate?: string | null;
          paymentProvider?: string | null;
          paymentStatus?: string;
          phoneNumber: string;
          products: Json;
          status?: string;
        };
        Update: {
          billingAddress?: Json;
          companyName?: string | null;
          created_at?: string;
          deliveryDate?: string | null;
          deliveryShopId?: string | null;
          email?: string;
          firstName?: string;
          id?: string;
          lastName?: string;
          paymentDate?: string | null;
          paymentProvider?: string | null;
          paymentStatus?: string;
          phoneNumber?: string;
          products?: Json;
          status?: string;
        };
        Relationships: [];
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
          onHomepage: boolean;
          price: number | null;
          quantity: number | null;
          shopId: string | null;
          slug: string;
          variants: Json | null;
          variantsImages: Json | null;
        };
        Insert: {
          categoryId: string;
          created_at?: string;
          description?: string | null;
          fromPrice?: number | null;
          id?: string;
          mainImage?: Json | null;
          name: string;
          onHomepage?: boolean;
          price?: number | null;
          quantity?: number | null;
          shopId?: string | null;
          slug: string;
          variants?: Json | null;
          variantsImages?: Json | null;
        };
        Update: {
          categoryId?: string;
          created_at?: string;
          description?: string | null;
          fromPrice?: number | null;
          id?: string;
          mainImage?: Json | null;
          name?: string;
          onHomepage?: boolean;
          price?: number | null;
          quantity?: number | null;
          shopId?: string | null;
          slug?: string;
          variants?: Json | null;
          variantsImages?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'products_categoryId_fkey';
            columns: ['categoryId'];
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'products_shopId_fkey';
            columns: ['shopId'];
            referencedRelation: 'shops';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [];
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
