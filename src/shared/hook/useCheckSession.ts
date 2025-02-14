import { useSessionUser } from '../lib/reactquery';

export const useCheckSession = ()=>{
    const {isLoading,isError,data,error} = useSessionUser();
    if(data?.data?.user?.email)
    return {
        isLoading,isError
    }
}