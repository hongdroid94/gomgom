import { supabase } from '../../../app';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './index.ts';

export const useQueryUser = () => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: queryKeys.getUser,
        queryFn: () => supabase.auth.getUser(),
    });
    return {
        isLoading,
        data,
        isError,
        error,
    };
};
