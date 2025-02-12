export enum LoginType{
    GOOGLE="GOOGLE",
    EMAIL="EMAIL",
}

export default interface User {
    id: string;
    nickname: string;
    email: string;
    loginType: LoginType;
    profileImageUrl?: string;
    createdAt: Date;
    deletedAt?: Date | null;
}
