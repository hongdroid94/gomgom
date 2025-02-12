import { supabase } from '../../../app';
import { RequestUserDto } from '../model';
import User, { LoginType } from '../../../entities/user';

class AuthApi {
    // 구글 로그인 및 회원가입 : 존재하는 계정이면 바로 홈으로 가고 아닐경우 수파베이스 auth 에 등록
    registerOrSignInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173/register/profile',
            },
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

    // 가입된 이메일인지 확인 true 이 가입된 이메일
    checkRegisteredEmail = async (email: string): Promise<boolean> => {
        const { data, error } = await supabase.from('users').select('id').eq('email', email);
        if (error) throw error;

        return data?.length > 0;
    };

    // 유저 데이터 데이터베이스에 삽입 : 회원가입
    insertUserData = async (requestUserDto: RequestUserDto) => {
        const { data, error } = await supabase.from('users').insert(requestUserDto);
        if (error) {
            throw error;
        }

        console.log(data);
        return data;
    };

    // 이미지 업로드
    uploadImageFileAtSupabase = async (uid: string, file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${uid}.${fileExt}`; // 고유한 파일명 생성
        const filePath = `public/${fileName}`;
        const { data, error } = await supabase.storage
            .from('images') // 버킷 이름
            .upload(filePath, file, {
                cacheControl: '3600',
            });
        if (error) throw error;
        if (!data?.fullPath) {
            throw new Error('이미지 업로드 실패 ');
        }
        return data.fullPath!;
    };

    // 유저 정보 조회
    findUserByEmailAndLoginType = async (email: string, loginType: LoginType) => {
        const {
            data,
            error,
        } = await supabase.from('users').select('*').eq('email', email).eq('login_type', loginType);
        if (error) throw error;
        if (!data || data?.length===0) {
            throw new Error('유저 정보를 가져오는데 실패했습니다.');
        }
        return data[0] as User;
    };
}

export const authApi = new AuthApi();
