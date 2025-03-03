import { useMutation } from '@tanstack/react-query';
import { profileApi } from '../api';
import { authApi } from '../../auth';

export const useMutateDeleteAccount = () => {
    return useMutation({
        mutationFn: async (userId: number) => {
            return profileApi.deleteAccount(userId);
        },
        onSuccess: async () => {
            await authApi.logout();
        },
        onError: (e) => {
            throw e;
        },
    });
};