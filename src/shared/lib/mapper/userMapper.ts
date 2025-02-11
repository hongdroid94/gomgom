import { User } from '@supabase/supabase-js';
import { LoginType, RequestUserDto } from '../../../features/auth/model';

export const mapperUserToRequestUserDto = (data: User): RequestUserDto => {
    console.log(data);
    if (!data.email) {
        throw new Error('유저 정보를 불러오는데 실패 했습니다.');
    }
    const loginType = data.app_metadata.provider === 'email' ? LoginType.EMAIL : LoginType.GOOGLE;
    return {
        email: data.email,
        login_type: loginType,
        nickname: '',
        profile_image_url: null,
        uid: data.id,
    };
};
