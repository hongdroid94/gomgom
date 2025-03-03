import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestProfileUpdateDto } from '../model';
import { profileApi } from '../api';
import UserDto from '../../../entities/user';
import { queryKeys } from '../../../shared/lib/reactquery';
import { authApi } from '../../auth';

export const useMutateProfileUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: RequestProfileUpdateDto) => {
            let uploadUrl=null;
            if(data.file){
                uploadUrl = await authApi.uploadImageFileAtSupabase(data.userId.toString(),data.file);
            }
            return await profileApi.updateUserName({...data,profileUrl:uploadUrl});
        },
        onSuccess: (data: UserDto) => {
            const user = queryClient.getQueryData<UserDto>(queryKeys.getAuthUser);
            console.log("getQUerydata user",user);
            if (!user) {
                throw new Error('유저정보를 가져오는데 실패했습니다. 다시 시도해주세요');
            }
            queryClient.setQueryData(queryKeys.getAuthUser, { ...user, nickname: data.nickname });
        },
        onError: (error) => {
            throw error;
        },
    });
};