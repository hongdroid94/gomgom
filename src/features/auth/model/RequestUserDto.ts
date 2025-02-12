import { LoginType } from '../../../entities/user';

export type RequestUserDto = {
    email: string;
    nickname: string;
    login_type: LoginType;
    profile_image_url: string | null;
    uid: string;
};
