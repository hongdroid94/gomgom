import { supabase } from '../../../app';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './index.ts';

// 로그인 정보 가져 체크 (웹 캐시에 저장된 액세스 토큰,리프레시 토큰 기반으로 인증)
export const useSessionUser = () => {
    return useQuery({
        queryKey: queryKeys.getUser,
        queryFn: () => supabase.auth.getUser(),
    });
};
