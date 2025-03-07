import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../shared/lib/reactquery';
import { ideaApi } from '../api';

async function getIdeaForUser(userId: number) {
    const result = await ideaApi.findAllIdeaByUserId(userId)
    return result;
}

export const useQueryGetIdeaForUser = (userId: number) => {
    return useQuery({
        queryKey: queryKeys.getIdeaForUser,
        queryFn: () => getIdeaForUser(userId) ,
    });
};