import { create } from "zustand";
import { User } from "@/types/user";

type AuthStore = {
  isAuthorised: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthorised: false,
  user: null,
  setUser: (user: User) => {
    set(() => ({ isAuthorised: true, user }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ isAuthorised: false, user: null }));
  },
}));
