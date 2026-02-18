import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/database.types';
import { toast } from 'sonner';

type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    isAdmin: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, fullName: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    phone: string | null;
    role: 'customer' | 'admin';
    created_at: string;
    updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const initializeAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);

                if (session?.user) {
                    await fetchProfile(session.user.id);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);

                if (session?.user) {
                    await fetchProfile(session.user.id);
                } else {
                    setProfile(null);
                    setIsAdmin(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;

            if (data) {
                setProfile(data as unknown as UserProfile);
                setIsAdmin((data as any).role === 'admin');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
            setIsAdmin(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                await fetchProfile(data.user.id);
                toast.success('Welcome back!');
            }
        } catch (error) {
            const authError = error as AuthError;
            toast.error(authError.message || 'Failed to sign in');
            throw error;
        }
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            if (data.user) {
                toast.success('Account created successfully! Please check your email to verify.');
            }
        } catch (error) {
            const authError = error as AuthError;
            toast.error(authError.message || 'Failed to sign up');
            throw error;
        }
    };

    const signOut = async () => {
        // Always clear local state first — even if Supabase API call fails
        // (expired session, network error) the user should still be signed out locally
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        try {
            await supabase.auth.signOut();
            toast.success('Signed out successfully');
        } catch {
            // Silently ignore — local state is already cleared above
        }
    };

    const updateProfile = async (data: Partial<UserProfile>) => {
        if (!user) {
            toast.error('You must be logged in to update your profile');
            return;
        }

        try {
            const { error } = await (supabase as any)
                .from('profiles')
                .update(data)
                .eq('id', user.id);

            if (error) throw error;

            await fetchProfile(user.id);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
            throw error;
        }
    };

    const value = {
        user,
        profile,
        isAdmin,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
