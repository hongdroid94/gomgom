import { supabase } from '../../../app';

// 인증 관련 API 호출을 담당하는 클래스입니다
class AuthApi {
    // 구글 OAuth 로그인/회원가입
    registerOrSignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (data) {
            throw error;
        }
        return data;
    };

    // 이메일 OTP 인증 요청
    registerEmailWithOtp = async (email: string) => {
        const { data, error } = await supabase.auth.signInWithOtp({ email: email });
        if (error) {
            throw error;
        }
        return data;
    };

    // OTP 코드 검증
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
