export enum LoginType {
    GOOGLE = 'GOOGLE',
    EMAIL = 'EMAIL',
}


export default interface UserDto {
    id: string;
    nickname: string;
    email: string;
    loginType: LoginType;
    profileImageUrl?: string;
    createdAt: Date;
    deletedAt?: Date | null;
}
export type User = {
    id: string;
    nickname: string;
    email: string;
    login_type: LoginType;
    profile_image_url?: string;
    created_at: Date;
    deleted_at?: Date | null;
}
