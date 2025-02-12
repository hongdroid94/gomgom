import { useQueryUser } from '../lib/reactquery';

export const useCheckSession = ()=>{
    const {isLoading,isError,data,error} = useQueryUser();
    if(data?.data?.user?.email)
    return {
        isLoading,isError
    }
}