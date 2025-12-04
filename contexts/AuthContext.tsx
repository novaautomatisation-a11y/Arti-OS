'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Company = Database['public']['Tables']['companies']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  company: Company | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Récupérer l'utilisateur initial
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) {
        loadProfileAndCompany(user.id)
      } else {
        setLoading(false)
      }
    })

    // Écouter les changements d'auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadProfileAndCompany(session.user.id)
      } else {
        setProfile(null)
        setCompany(null)
        setLoading(false)
        router.push('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadProfileAndCompany = async (userId: string) => {
    try {
      // Charger le profil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single<Profile>()

      if (profileError || !profileData) {
        console.error('Error loading profile:', profileError)
        setLoading(false)
        return
      }

      setProfile(profileData)

      // Charger la company
      if (profileData.company_id) {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('*')
          .eq('id', profileData.company_id)
          .single<Company>()

        if (companyError) {
          console.error('Error loading company:', companyError)
        } else if (companyData) {
          setCompany(companyData)
        }
      }

      setLoading(false)
    } catch (error) {
      console.error('Error in loadProfileAndCompany:', error)
      setLoading(false)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    setCompany(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        company,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
