import { supabase } from '../../../app';

class AuthApi {
    // 구글 로그인 및 회원가입 : 존재하는 계정이면 바로 홈으로 가고 아닐경우 수파베이스 auth 에 등록
    registerOrSignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (data) {
            throw error;
        }
        return data;
    };
    // 이메일 회원가입 시도 : 해당 이메일 주소로 otp 전송
    registerEmailWithOtp = async (email: string) => {
        const { data, error } = await supabase.auth.signInWithOtp({ email: email });
        if (error) {
            throw error;
        }
        return data;
    };
    // otp 인증
    validateEmailOtp = async (email: string, otp: string) => {
        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: otp,
            type: 'email',
        });
        if (error) {
            throw error;
        }
        return data;
    };
}

export const authApi = new AuthApi();
