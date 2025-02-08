import {supabase} from "../../../app";

class AuthApi{

     registerOrSignInWithGoogle = async ()=>{
        const {data,error} = await supabase.auth.signInWithOAuth({
            provider:'google'
        });
        if(data){
            throw error;
        }
        return data;
    }
     registerEmailWithOtp = async(email:string)=>{
        const {data,error} =await supabase.auth.signInWithOtp({email:email,});
        if(error){
            throw error;
        }
        return data.user;

    }
    validateEmailOtp = async(email:string,otp:string)=>{
         const {data,error} = await  supabase.auth.verifyOtp({
             email:email,
             token:otp,
             type:"email"
         })
        if(error){
            throw error;
        }
        return data;
    }
}
export const authApi = new AuthApi();
