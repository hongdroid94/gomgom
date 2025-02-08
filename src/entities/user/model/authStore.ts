import { create } from "zustand";

interface AuthState {
    emailLogin: string;
    setEmailLogin: (emailLogin: string) => void;
}

// 로그인시 필요한 전역 상태관리
export const useAuthStore = create<AuthState>((set) => ({
    emailLogin: "",
    setEmailLogin: (emailLogin) => set({ emailLogin }),
}));
