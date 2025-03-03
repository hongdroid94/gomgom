import { create } from 'zustand';

interface IdeaState {
    ideaSubject: string;
    setIdeaSubject: (subject: string) => void;
    clearIdeaSubject: () => void;
}

export const useIdeaStore = create<IdeaState>((set) => ({
    ideaSubject: '',
    setIdeaSubject: (subject) => set({ ideaSubject: subject }),
    clearIdeaSubject: () => set({ ideaSubject: '' }),
})); 