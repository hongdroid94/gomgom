import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../app';
import { authApi } from '../api';
import { LoginType } from '../../../entities/user';

async function validateGmail(){
    const {data,error} =await supabase.auth.getUser()
    if(error){
        throw error;
    }
    console.log(data);
    if(!data?.user?.email ||!data ){
        throw new Error("유저 정보를 가져오는데 실패 했습니다.")
    }
    const result = await authApi.validationEmail(data.user.email,LoginType.GOOGLE)
    if(!result){
        await supabase.auth.signOut();
        throw new Error("이미 해당 아이디로 가입된 이메일이 존재합니다.")
    }
    return true;
}
export const useValidateGmail = ()=>{
    return useQuery({
        queryKey:['validate','gmail'],
        queryFn:validateGmail,
        retry:false,
    })

}