import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'software_dev_leader' | 'bi_leader' | 'rpa_leader' | 'viewer';

interface UserRoleData {
  role: UserRole;
  department: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRoleData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  canEdit: (department: string) => boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRoleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      console.log('🔍 Fetching user role for user ID:', userId);

      const { data, error } = await supabase
        .from('user_roles')
        .select('role, department, email')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('❌ Error fetching user role from Supabase:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });

        if (error.code === 'PGRST116') {
          console.warn('⚠️ No role found for this user. Please assign a role in Supabase.');
          console.warn('Run this query in Supabase SQL Editor:');
          console.warn(`INSERT INTO public.user_roles (user_id, role, department, email)
VALUES ('${userId}', 'admin', NULL, 'your-email@example.com');`);
        }

        throw error;
      }

      console.log('✅ User role fetched successfully:', data);
      setUserRole(data);
    } catch (error: any) {
      console.error('❌ Failed to fetch user role:', error);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const canEdit = (department: string): boolean => {
    if (!userRole) return false;
    if (userRole.role === 'admin') return true;
    if (userRole.role === 'viewer') return false;
    
    const roleMap: Record<string, string> = {
      'software_dev_leader': 'Software Development',
      'bi_leader': 'Business Intelligence',
      'rpa_leader': 'Robotic Process Automation'
    };

    return roleMap[userRole.role] === department;
  };

  const isAdmin = userRole?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signIn, signOut, canEdit, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

