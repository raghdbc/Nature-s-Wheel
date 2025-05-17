import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface Profile {
  id: string;
  name: string;
  phone: string | null;
  default_address: string | null;
  city: string | null;
  pincode: string | null;
}

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  register: (name: string, email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  loading: boolean;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo credentials
const DEMO_USER = {
  email: 'demo@example.com',
  password: 'password',
  id: 'demo-user-id',
  name: 'Demo User',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('user');
    const savedProfile = localStorage.getItem('profile');
    
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Only allow demo credentials
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const demoUser = { id: DEMO_USER.id, email: DEMO_USER.email };
        const demoProfile = {
          id: DEMO_USER.id,
          name: DEMO_USER.name,
          phone: null,
          default_address: null,
          city: null,
          pincode: null,
        };

        setUser(demoUser);
        setProfile(demoProfile);

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('profile', JSON.stringify(demoProfile));

        toast.success('Welcome back!');
        return { error: null };
      }

      toast.error('Invalid credentials. Please use demo account.');
      return { error: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in');
      return { error };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      toast.error('Registration is disabled. Please use the demo account.');
      return { error: 'Registration disabled' };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register');
      return { error };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setProfile(null);
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!profile) throw new Error('No profile');

      const updatedProfile = {
        ...profile,
        ...data,
      };

      setProfile(updatedProfile);
      localStorage.setItem('profile', JSON.stringify(updatedProfile));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};