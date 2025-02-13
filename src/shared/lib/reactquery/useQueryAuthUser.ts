import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './index.ts';
import { supabase } from '../../../app';
import { authApi } from '../../../features/auth';
import { LoginType } from '../../../entities/user';

async function fetchUserRegistered() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        // 토큰 만료
        console.error(error);
        throw error;
    }
    if (!data.user || !data.user.email) {
        console.error(error);
        throw error;
    }
    const isRegistered = await authApi.checkRegisteredEmail(data.user.email);
    console.log("가입 여부 :",isRegistered);
    if (!isRegistered) {
        return false;
    }
    return await authApi.findUserByEmailAndLoginType(data.user.email, data.user.app_metadata.provider === 'email' ? LoginType.EMAIL : LoginType.GOOGLE);

}

// 웹캐시(액세스,리프레시 토큰)기반으로 OAuth 혹은 이메일 로그인 시도후 로그인 성공시 해당 이메일이 가입된 유저인지 체크
export const useQueryAuthUser = () => {
    return useQuery({
        queryKey: queryKeys.getAuthUser,
        queryFn: ()=>fetchUserRegistered(),
        retry:false,
    });
};