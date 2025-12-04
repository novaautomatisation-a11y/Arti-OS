export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          address: string | null
          postal_code: string | null
          city: string | null
          country: string
          phone: string | null
          email: string | null
          vat_number: string | null
          settings: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string
          phone?: string | null
          email?: string | null
          vat_number?: string | null
          settings?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          address?: string | null
          postal_code?: string | null
          city?: string | null
          country?: string
          phone?: string | null
          email?: string | null
          vat_number?: string | null
          settings?: Json | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          company_id: string
          full_name: string
          role: 'owner' | 'admin' | 'member' | 'worker'
          phone: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          company_id: string
          full_name: string
          role?: 'owner' | 'admin' | 'member' | 'worker'
          phone?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          full_name?: string
          role?: 'owner' | 'admin' | 'member' | 'worker'
          phone?: string | null
          avatar_url?: string | null
        }
      }
      clients: {
        Row: {
          id: string
          created_at: string
          company_id: string
          name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          address: string | null
          postal_code: string | null
          city: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          name: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          name?: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          postal_code?: string | null
          city?: string | null
          notes?: string | null
        }
      }
      devis: {
        Row: {
          id: string
          created_at: string
          company_id: string
          client_id: string
          site_id: string | null
          numero: string
          status: 'draft' | 'sent' | 'accepted' | 'refused' | 'expired'
          total_ht: number
          tva_rate: number
          total_ttc: number
          valid_until: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          client_id: string
          site_id?: string | null
          numero: string
          status?: 'draft' | 'sent' | 'accepted' | 'refused' | 'expired'
          total_ht?: number
          tva_rate?: number
          total_ttc?: number
          valid_until?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          client_id?: string
          site_id?: string | null
          numero?: string
          status?: 'draft' | 'sent' | 'accepted' | 'refused' | 'expired'
          total_ht?: number
          tva_rate?: number
          total_ttc?: number
          valid_until?: string | null
          notes?: string | null
        }
      }
      chantiers: {
        Row: {
          id: string
          created_at: string
          company_id: string
          client_id: string
          site_id: string
          devis_id: string | null
          titre: string
          description: string | null
          status: 'planned' | 'en_cours' | 'paused' | 'completed' | 'cancelled'
          date_debut_prevue: string | null
          date_fin_prevue: string | null
          date_debut_reelle: string | null
          date_fin_reelle: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          client_id: string
          site_id: string
          devis_id?: string | null
          titre: string
          description?: string | null
          status?: 'planned' | 'en_cours' | 'paused' | 'completed' | 'cancelled'
          date_debut_prevue?: string | null
          date_fin_prevue?: string | null
          date_debut_reelle?: string | null
          date_fin_reelle?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          client_id?: string
          site_id?: string
          devis_id?: string | null
          titre?: string
          description?: string | null
          status?: 'planned' | 'en_cours' | 'paused' | 'completed' | 'cancelled'
          date_debut_prevue?: string | null
          date_fin_prevue?: string | null
          date_debut_reelle?: string | null
          date_fin_reelle?: string | null
        }
      }
      factures: {
        Row: {
          id: string
          created_at: string
          company_id: string
          client_id: string
          chantier_id: string | null
          numero: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          date_emission: string
          date_echeance: string
          total_ht: number
          tva_rate: number
          total_ttc: number
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          client_id: string
          chantier_id?: string | null
          numero: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          date_emission?: string
          date_echeance: string
          total_ht?: number
          tva_rate?: number
          total_ttc?: number
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          client_id?: string
          chantier_id?: string | null
          numero?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          date_emission?: string
          date_echeance?: string
          total_ht?: number
          tva_rate?: number
          total_ttc?: number
          notes?: string | null
        }
      }
      interventions: {
        Row: {
          id: string
          created_at: string
          company_id: string
          chantier_id: string
          user_id: string
          date: string
          heure_debut: string | null
          heure_fin: string | null
          duree_minutes: number | null
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          company_id: string
          chantier_id: string
          user_id: string
          date: string
          heure_debut?: string | null
          heure_fin?: string | null
          duree_minutes?: number | null
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          company_id?: string
          chantier_id?: string
          user_id?: string
          date?: string
          heure_debut?: string | null
          heure_fin?: string | null
          duree_minutes?: number | null
          description?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
