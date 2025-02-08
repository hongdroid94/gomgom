export type LoginType = "GOOGLE" | "EMAIL";

export default interface User {
    id: string;
    nickname: string;
    email: string;
    loginType: LoginType;
    profileImageUrl?: string;
    createdAt: Date;
    deletedAt?: Date | null;
}
