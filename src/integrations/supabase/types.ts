export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line: string;
          city: string;
          created_at: string;
          district: string | null;
          id: string;
          is_default: boolean;
          label: string | null;
          phone: string;
          postal_code: string | null;
          province: string;
          recipient_name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address_line: string;
          city: string;
          created_at?: string;
          district?: string | null;
          id?: string;
          is_default?: boolean;
          label?: string | null;
          phone: string;
          postal_code?: string | null;
          province: string;
          recipient_name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address_line?: string;
          city?: string;
          created_at?: string;
          district?: string | null;
          id?: string;
          is_default?: boolean;
          label?: string | null;
          phone?: string;
          postal_code?: string | null;
          province?: string;
          recipient_name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          action: string;
          actor_id: string | null;
          created_at: string;
          entity: string;
          entity_id: string | null;
          id: string;
          payload: Json | null;
        };
        Insert: {
          action: string;
          actor_id?: string | null;
          created_at?: string;
          entity: string;
          entity_id?: string | null;
          id?: string;
          payload?: Json | null;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          created_at?: string;
          entity?: string;
          entity_id?: string | null;
          id?: string;
          payload?: Json | null;
        };
        Relationships: [];
      };
      bank_accounts: {
        Row: {
          account_holder: string;
          account_number: string;
          active: boolean;
          bank_code: string | null;
          bank_name: string;
          created_at: string;
          id: string;
          logo_url: string | null;
          sort_order: number;
        };
        Insert: {
          account_holder: string;
          account_number: string;
          active?: boolean;
          bank_code?: string | null;
          bank_name: string;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          sort_order?: number;
        };
        Update: {
          account_holder?: string;
          account_number?: string;
          active?: boolean;
          bank_code?: string | null;
          bank_name?: string;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      banners: {
        Row: {
          active: boolean;
          created_at: string;
          cta_label: string | null;
          cta_url: string | null;
          ends_at: string | null;
          id: string;
          image_url: string;
          placement: string;
          sort_order: number;
          starts_at: string | null;
          subtitle: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          cta_label?: string | null;
          cta_url?: string | null;
          ends_at?: string | null;
          id?: string;
          image_url: string;
          placement?: string;
          sort_order?: number;
          starts_at?: string | null;
          subtitle?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          cta_label?: string | null;
          cta_url?: string | null;
          ends_at?: string | null;
          id?: string;
          image_url?: string;
          placement?: string;
          sort_order?: number;
          starts_at?: string | null;
          subtitle?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          author_id: string | null;
          category_id: string | null;
          content: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          status: Database["public"]["Enums"]["publish_status"];
          thumbnail_url: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          category_id?: string | null;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["publish_status"];
          thumbnail_url?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          category_id?: string | null;
          content?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["publish_status"];
          thumbnail_url?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "blog_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      brands: {
        Row: {
          created_at: string;
          id: string;
          logo_url: string | null;
          name: string;
          slug: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name: string;
          slug: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name?: string;
          slug?: string;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          quantity: number;
          updated_at: string;
          user_id: string;
          variant_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          quantity?: number;
          updated_at?: string;
          user_id: string;
          variant_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          quantity?: number;
          updated_at?: string;
          user_id?: string;
          variant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string;
          id: string;
          image_url: string | null;
          name: string;
          parent_id: string | null;
          slug: string;
          sort_order: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          name: string;
          parent_id?: string | null;
          slug: string;
          sort_order?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          name?: string;
          parent_id?: string | null;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      clubs: {
        Row: {
          country_id: string | null;
          created_at: string;
          id: string;
          league_id: string | null;
          logo_url: string | null;
          name: string;
          primary_color: string | null;
          slug: string;
          sort_order: number;
        };
        Insert: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          league_id?: string | null;
          logo_url?: string | null;
          name: string;
          primary_color?: string | null;
          slug: string;
          sort_order?: number;
        };
        Update: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          league_id?: string | null;
          logo_url?: string | null;
          name?: string;
          primary_color?: string | null;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "clubs_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "clubs_league_id_fkey";
            columns: ["league_id"];
            isOneToOne: false;
            referencedRelation: "leagues";
            referencedColumns: ["id"];
          },
        ];
      };
      countries: {
        Row: {
          code: string;
          created_at: string;
          flag_emoji: string | null;
          id: string;
          name: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          flag_emoji?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          flag_emoji?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      courier_services: {
        Row: {
          active: boolean;
          code: string;
          courier_id: string;
          estimated_days: string | null;
          id: string;
          name: string;
        };
        Insert: {
          active?: boolean;
          code: string;
          courier_id: string;
          estimated_days?: string | null;
          id?: string;
          name: string;
        };
        Update: {
          active?: boolean;
          code?: string;
          courier_id?: string;
          estimated_days?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "courier_services_courier_id_fkey";
            columns: ["courier_id"];
            isOneToOne: false;
            referencedRelation: "couriers";
            referencedColumns: ["id"];
          },
        ];
      };
      couriers: {
        Row: {
          active: boolean;
          code: string;
          id: string;
          logo_url: string | null;
          name: string;
          sort_order: number;
        };
        Insert: {
          active?: boolean;
          code: string;
          id?: string;
          logo_url?: string | null;
          name: string;
          sort_order?: number;
        };
        Update: {
          active?: boolean;
          code?: string;
          id?: string;
          logo_url?: string | null;
          name?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      leagues: {
        Row: {
          country_id: string | null;
          created_at: string;
          id: string;
          logo_url: string | null;
          name: string;
          slug: string;
          sort_order: number;
        };
        Insert: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          country_id?: string | null;
          created_at?: string;
          id?: string;
          logo_url?: string | null;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "leagues_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          id: string;
          link: string | null;
          read_at: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link?: string | null;
          read_at?: string | null;
          title: string;
          type: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          id?: string;
          link?: string | null;
          read_at?: string | null;
          title?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          created_at: string;
          id: string;
          image_snapshot: string | null;
          name_snapshot: string;
          order_id: string;
          price_snapshot: number;
          product_id: string | null;
          quantity: number;
          size_snapshot: string | null;
          sku_snapshot: string;
          subtotal: number;
          variant_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_snapshot?: string | null;
          name_snapshot: string;
          order_id: string;
          price_snapshot: number;
          product_id?: string | null;
          quantity: number;
          size_snapshot?: string | null;
          sku_snapshot: string;
          subtotal: number;
          variant_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_snapshot?: string | null;
          name_snapshot?: string;
          order_id?: string;
          price_snapshot?: number;
          product_id?: string | null;
          quantity?: number;
          size_snapshot?: string | null;
          sku_snapshot?: string;
          subtotal?: number;
          variant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      order_status_history: {
        Row: {
          by_user_id: string | null;
          created_at: string;
          from_status: Database["public"]["Enums"]["order_status"] | null;
          id: string;
          note: string | null;
          order_id: string;
          to_status: Database["public"]["Enums"]["order_status"];
        };
        Insert: {
          by_user_id?: string | null;
          created_at?: string;
          from_status?: Database["public"]["Enums"]["order_status"] | null;
          id?: string;
          note?: string | null;
          order_id: string;
          to_status: Database["public"]["Enums"]["order_status"];
        };
        Update: {
          by_user_id?: string | null;
          created_at?: string;
          from_status?: Database["public"]["Enums"]["order_status"] | null;
          id?: string;
          note?: string | null;
          order_id?: string;
          to_status?: Database["public"]["Enums"]["order_status"];
        };
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          address_line: string;
          admin_notes: string | null;
          bank_account_id: string | null;
          cancelled_at: string | null;
          city: string;
          courier_code: string | null;
          courier_name: string | null;
          courier_service_code: string | null;
          courier_service_name: string | null;
          created_at: string;
          deleted_at: string | null;
          delivered_at: string | null;
          discount: number;
          district: string | null;
          email: string;
          expires_at: string | null;
          id: string;
          notes: string | null;
          order_number: string;
          paid_at: string | null;
          phone: string;
          postal_code: string | null;
          province: string;
          recipient_name: string;
          shipped_at: string | null;
          shipping_cost: number;
          status: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          updated_at: string;
          user_id: string | null;
          voucher_code: string | null;
          voucher_id: string | null;
          weight_grams: number;
        };
        Insert: {
          address_line: string;
          admin_notes?: string | null;
          bank_account_id?: string | null;
          cancelled_at?: string | null;
          city: string;
          courier_code?: string | null;
          courier_name?: string | null;
          courier_service_code?: string | null;
          courier_service_name?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          delivered_at?: string | null;
          discount?: number;
          district?: string | null;
          email: string;
          expires_at?: string | null;
          id?: string;
          notes?: string | null;
          order_number: string;
          paid_at?: string | null;
          phone: string;
          postal_code?: string | null;
          province: string;
          recipient_name: string;
          shipped_at?: string | null;
          shipping_cost?: number;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal: number;
          total: number;
          updated_at?: string;
          user_id?: string | null;
          voucher_code?: string | null;
          voucher_id?: string | null;
          weight_grams?: number;
        };
        Update: {
          address_line?: string;
          admin_notes?: string | null;
          bank_account_id?: string | null;
          cancelled_at?: string | null;
          city?: string;
          courier_code?: string | null;
          courier_name?: string | null;
          courier_service_code?: string | null;
          courier_service_name?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          delivered_at?: string | null;
          discount?: number;
          district?: string | null;
          email?: string;
          expires_at?: string | null;
          id?: string;
          notes?: string | null;
          order_number?: string;
          paid_at?: string | null;
          phone?: string;
          postal_code?: string | null;
          province?: string;
          recipient_name?: string;
          shipped_at?: string | null;
          shipping_cost?: number;
          status?: Database["public"]["Enums"]["order_status"];
          subtotal?: number;
          total?: number;
          updated_at?: string;
          user_id?: string | null;
          voucher_code?: string | null;
          voucher_id?: string | null;
          weight_grams?: number;
        };
        Relationships: [
          {
            foreignKeyName: "orders_bank_account_id_fkey";
            columns: ["bank_account_id"];
            isOneToOne: false;
            referencedRelation: "bank_accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_voucher_id_fkey";
            columns: ["voucher_id"];
            isOneToOne: false;
            referencedRelation: "vouchers";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          bank_account_id: string | null;
          created_at: string;
          id: string;
          order_id: string;
          proof_url: string | null;
          reject_reason: string | null;
          sender_bank: string | null;
          sender_name: string | null;
          status: Database["public"]["Enums"]["payment_status"];
          transferred_at: string | null;
          updated_at: string;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          amount: number;
          bank_account_id?: string | null;
          created_at?: string;
          id?: string;
          order_id: string;
          proof_url?: string | null;
          reject_reason?: string | null;
          sender_bank?: string | null;
          sender_name?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transferred_at?: string | null;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          amount?: number;
          bank_account_id?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string;
          proof_url?: string | null;
          reject_reason?: string | null;
          sender_bank?: string | null;
          sender_name?: string | null;
          status?: Database["public"]["Enums"]["payment_status"];
          transferred_at?: string | null;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_bank_account_id_fkey";
            columns: ["bank_account_id"];
            isOneToOne: false;
            referencedRelation: "bank_accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "payments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      players: {
        Row: {
          club_id: string | null;
          country_id: string | null;
          created_at: string;
          default_number: number | null;
          id: string;
          name: string;
          photo_url: string | null;
          slug: string;
        };
        Insert: {
          club_id?: string | null;
          country_id?: string | null;
          created_at?: string;
          default_number?: number | null;
          id?: string;
          name: string;
          photo_url?: string | null;
          slug: string;
        };
        Update: {
          club_id?: string | null;
          country_id?: string | null;
          created_at?: string;
          default_number?: number | null;
          id?: string;
          name?: string;
          photo_url?: string | null;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: "players_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "players_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          alt: string | null;
          created_at: string;
          id: string;
          is_primary: boolean;
          product_id: string;
          sort_order: number;
          url: string;
        };
        Insert: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          product_id: string;
          sort_order?: number;
          url: string;
        };
        Update: {
          alt?: string | null;
          created_at?: string;
          id?: string;
          is_primary?: boolean;
          product_id?: string;
          sort_order?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          additional_price: number;
          created_at: string;
          id: string;
          product_id: string;
          size: string;
          sku: string;
          stock: number;
        };
        Insert: {
          additional_price?: number;
          created_at?: string;
          id?: string;
          product_id: string;
          size: string;
          sku: string;
          stock?: number;
        };
        Update: {
          additional_price?: number;
          created_at?: string;
          id?: string;
          product_id?: string;
          size?: string;
          sku?: string;
          stock?: number;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_videos: {
        Row: {
          created_at: string;
          id: string;
          poster_url: string | null;
          product_id: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          poster_url?: string | null;
          product_id: string;
          url: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          poster_url?: string | null;
          product_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_videos_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          authenticity_note: string | null;
          base_price: number;
          brand_id: string | null;
          category_id: string | null;
          club_id: string | null;
          condition: Database["public"]["Enums"]["product_condition"];
          country_id: string | null;
          created_at: string;
          default_number: number | null;
          deleted_at: string | null;
          description: string | null;
          id: string;
          is_bestseller: boolean;
          is_featured: boolean;
          is_limited: boolean;
          is_sale: boolean;
          is_vintage: boolean;
          league_id: string | null;
          material: string | null;
          name: string;
          patch: string | null;
          player_id: string | null;
          rating_avg: number;
          rating_count: number;
          sale_price: number | null;
          season_id: string | null;
          short_description: string | null;
          sku: string;
          slug: string;
          sold_count: number;
          sponsor: string | null;
          status: Database["public"]["Enums"]["publish_status"];
          updated_at: string;
          view_count: number;
          weight_grams: number;
        };
        Insert: {
          authenticity_note?: string | null;
          base_price: number;
          brand_id?: string | null;
          category_id?: string | null;
          club_id?: string | null;
          condition?: Database["public"]["Enums"]["product_condition"];
          country_id?: string | null;
          created_at?: string;
          default_number?: number | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          is_bestseller?: boolean;
          is_featured?: boolean;
          is_limited?: boolean;
          is_sale?: boolean;
          is_vintage?: boolean;
          league_id?: string | null;
          material?: string | null;
          name: string;
          patch?: string | null;
          player_id?: string | null;
          rating_avg?: number;
          rating_count?: number;
          sale_price?: number | null;
          season_id?: string | null;
          short_description?: string | null;
          sku: string;
          slug: string;
          sold_count?: number;
          sponsor?: string | null;
          status?: Database["public"]["Enums"]["publish_status"];
          updated_at?: string;
          view_count?: number;
          weight_grams?: number;
        };
        Update: {
          authenticity_note?: string | null;
          base_price?: number;
          brand_id?: string | null;
          category_id?: string | null;
          club_id?: string | null;
          condition?: Database["public"]["Enums"]["product_condition"];
          country_id?: string | null;
          created_at?: string;
          default_number?: number | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          is_bestseller?: boolean;
          is_featured?: boolean;
          is_limited?: boolean;
          is_sale?: boolean;
          is_vintage?: boolean;
          league_id?: string | null;
          material?: string | null;
          name?: string;
          patch?: string | null;
          player_id?: string | null;
          rating_avg?: number;
          rating_count?: number;
          sale_price?: number | null;
          season_id?: string | null;
          short_description?: string | null;
          sku?: string;
          slug?: string;
          sold_count?: number;
          sponsor?: string | null;
          status?: Database["public"]["Enums"]["publish_status"];
          updated_at?: string;
          view_count?: number;
          weight_grams?: number;
        };
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brands";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_club_id_fkey";
            columns: ["club_id"];
            isOneToOne: false;
            referencedRelation: "clubs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_country_id_fkey";
            columns: ["country_id"];
            isOneToOne: false;
            referencedRelation: "countries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_league_id_fkey";
            columns: ["league_id"];
            isOneToOne: false;
            referencedRelation: "leagues";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "players";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_season_id_fkey";
            columns: ["season_id"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          phone: string | null;
          suspended: boolean;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          phone?: string | null;
          suspended?: boolean;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          phone?: string | null;
          suspended?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          admin_reply: string | null;
          comment: string | null;
          created_at: string;
          id: string;
          order_id: string | null;
          product_id: string;
          rating: number;
          status: Database["public"]["Enums"]["review_status"];
          title: string | null;
          updated_at: string;
          user_id: string;
          verified_purchase: boolean;
        };
        Insert: {
          admin_reply?: string | null;
          comment?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string | null;
          product_id: string;
          rating: number;
          status?: Database["public"]["Enums"]["review_status"];
          title?: string | null;
          updated_at?: string;
          user_id: string;
          verified_purchase?: boolean;
        };
        Update: {
          admin_reply?: string | null;
          comment?: string | null;
          created_at?: string;
          id?: string;
          order_id?: string | null;
          product_id?: string;
          rating?: number;
          status?: Database["public"]["Enums"]["review_status"];
          title?: string | null;
          updated_at?: string;
          user_id?: string;
          verified_purchase?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      seasons: {
        Row: {
          created_at: string;
          id: string;
          label: string;
          year_end: number | null;
          year_start: number | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          label: string;
          year_end?: number | null;
          year_start?: number | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          label?: string;
          year_end?: number | null;
          year_start?: number | null;
        };
        Relationships: [];
      };
      shipment_events: {
        Row: {
          description: string | null;
          id: string;
          occurred_at: string;
          shipment_id: string;
          status: string;
        };
        Insert: {
          description?: string | null;
          id?: string;
          occurred_at?: string;
          shipment_id: string;
          status: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          occurred_at?: string;
          shipment_id?: string;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shipment_events_shipment_id_fkey";
            columns: ["shipment_id"];
            isOneToOne: false;
            referencedRelation: "shipments";
            referencedColumns: ["id"];
          },
        ];
      };
      shipments: {
        Row: {
          courier_code: string | null;
          courier_name: string | null;
          created_at: string;
          delivered_at: string | null;
          estimated_arrival: string | null;
          id: string;
          order_id: string;
          service_code: string | null;
          shipped_at: string | null;
          status: string | null;
          tracking_number: string | null;
          updated_at: string;
        };
        Insert: {
          courier_code?: string | null;
          courier_name?: string | null;
          created_at?: string;
          delivered_at?: string | null;
          estimated_arrival?: string | null;
          id?: string;
          order_id: string;
          service_code?: string | null;
          shipped_at?: string | null;
          status?: string | null;
          tracking_number?: string | null;
          updated_at?: string;
        };
        Update: {
          courier_code?: string | null;
          courier_name?: string | null;
          created_at?: string;
          delivered_at?: string | null;
          estimated_arrival?: string | null;
          id?: string;
          order_id?: string;
          service_code?: string | null;
          shipped_at?: string | null;
          status?: string | null;
          tracking_number?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      store_settings: {
        Row: {
          address: string | null;
          city: string | null;
          created_at: string;
          email: string | null;
          facebook_url: string | null;
          favicon_url: string | null;
          footer_note: string | null;
          id: number;
          instagram_url: string | null;
          logo_url: string | null;
          origin_city_code: string | null;
          phone: string | null;
          postal_code: string | null;
          province: string | null;
          seo_description: string | null;
          seo_title: string | null;
          store_name: string;
          tagline: string | null;
          tiktok_url: string | null;
          twitter_url: string | null;
          updated_at: string;
          whatsapp: string | null;
          youtube_url: string | null;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          facebook_url?: string | null;
          favicon_url?: string | null;
          footer_note?: string | null;
          id?: number;
          instagram_url?: string | null;
          logo_url?: string | null;
          origin_city_code?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          province?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          store_name?: string;
          tagline?: string | null;
          tiktok_url?: string | null;
          twitter_url?: string | null;
          updated_at?: string;
          whatsapp?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          facebook_url?: string | null;
          favicon_url?: string | null;
          footer_note?: string | null;
          id?: number;
          instagram_url?: string | null;
          logo_url?: string | null;
          origin_city_code?: string | null;
          phone?: string | null;
          postal_code?: string | null;
          province?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          store_name?: string;
          tagline?: string | null;
          tiktok_url?: string | null;
          twitter_url?: string | null;
          updated_at?: string;
          whatsapp?: string | null;
          youtube_url?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
      vouchers: {
        Row: {
          active: boolean;
          code: string;
          created_at: string;
          description: string | null;
          id: string;
          max_discount: number | null;
          min_purchase: number;
          quota: number | null;
          type: Database["public"]["Enums"]["voucher_type"];
          updated_at: string;
          used_count: number;
          valid_from: string | null;
          valid_until: string | null;
          value: number;
        };
        Insert: {
          active?: boolean;
          code: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          max_discount?: number | null;
          min_purchase?: number;
          quota?: number | null;
          type: Database["public"]["Enums"]["voucher_type"];
          updated_at?: string;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
          value: number;
        };
        Update: {
          active?: boolean;
          code?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          max_discount?: number | null;
          min_purchase?: number;
          quota?: number | null;
          type?: Database["public"]["Enums"]["voucher_type"];
          updated_at?: string;
          used_count?: number;
          valid_from?: string | null;
          valid_until?: string | null;
          value?: number;
        };
        Relationships: [];
      };
      wishlists: {
        Row: {
          created_at: string;
          id: string;
          product_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          product_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          product_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wishlists_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      lookup_voucher: {
        Args: { p_code: string }
        Returns: {
          active: boolean
          code: string
          description: string
          id: string
          max_discount: number
          min_purchase: number
          quota: number
          type: string
          used_count: number
          valid_from: string
          valid_until: string
          value: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "customer";
      order_status:
      | "pending_payment"
      | "waiting_verification"
      | "paid"
      | "processing"
      | "packing"
      | "shipping"
      | "delivered"
      | "completed"
      | "cancelled"
      | "refund"
      | "returned";
      payment_status: "pending" | "approved" | "rejected";
      product_condition: "new" | "used" | "deadstock" | "vintage";
      publish_status: "draft" | "published";
      review_status: "pending" | "approved" | "rejected";
      voucher_type: "percent" | "nominal";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
    Row: infer R;
  }
  ? R
  : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I;
  }
  ? I
  : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U;
  }
  ? U
  : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "customer"],
      order_status: [
        "pending_payment",
        "waiting_verification",
        "paid",
        "processing",
        "packing",
        "shipping",
        "delivered",
        "completed",
        "cancelled",
        "refund",
        "returned",
      ],
      payment_status: ["pending", "approved", "rejected"],
      product_condition: ["new", "used", "deadstock", "vintage"],
      publish_status: ["draft", "published"],
      review_status: ["pending", "approved", "rejected"],
      voucher_type: ["percent", "nominal"],
    },
  },
} as const;
