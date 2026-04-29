import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { encryptData, decryptData, hashKey } from "@/utils/crypto";

export type Role = "admin" | "manager" | "tenant";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const hashedKey = hashKey(name);
          const encryptedValue = localStorage.getItem(hashedKey);
          if (!encryptedValue) return null;
          return decryptData(encryptedValue);
        },
        setItem: (name, value) => {
          const hashedKey = hashKey(name);
          const encryptedValue = encryptData(value);
          localStorage.setItem(hashedKey, encryptedValue);
        },
        removeItem: (name) => {
          const hashedKey = hashKey(name);
          localStorage.removeItem(hashedKey);
        },
      })),
    },
  ),
);
