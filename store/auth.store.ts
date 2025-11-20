import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  mobile?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  providerId: number | null;        // ← Add this
  isAuthenticated: boolean;
  login: (data: { user: User; token: string; providerId?: number }) => void; // ← Update signature
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      providerId: null,
      isAuthenticated: false,

      login: ({ user, token, providerId }) => {
        localStorage.setItem('token', token);
        set({
          user,
          token,
          providerId: providerId ?? null,        // ← Save provider ID
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          providerId: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);