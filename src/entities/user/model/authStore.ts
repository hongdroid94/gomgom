import { create } from 'zustand';

interface AuthState {
    emailLogin: string; // 로그인에 사용된 이메일 저장
    setEmailLogin: (emailLogin: string) => void; // 이메일 설정 함수
}

// 로그인 관련 전역 상태를 관리하는 store
export const useAuthStore = create<AuthState>((set) => ({
    emailLogin: '',
    setEmailLogin: (emailLogin) => set({ emailLogin }),
}));
