import { supabase } from '../../../app';
import UserDto, { UserEntity } from '../../../entities/user';
import { mapperUserEntityToUserDto } from '../../../shared/lib/mapper';
import { RequestProfileUpdateDto } from '../model';

class ProfileApi {
    async updateUserName(requestDto: RequestProfileUpdateDto): Promise<UserDto> {
        const { nickname, userId, profileUrl } = requestDto;
        const updateData: Record<string, string> = { nickname };
        if (profileUrl) {
            updateData.profile_image_url = "https://crbqmjtejobqcahbwnyy.supabase.co/storage/v1/object/public/"+profileUrl;
        }
        const { data, error } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', userId)
            .select('*');
        if (error) {
            throw error;
        }
        if (!data) {
            throw new Error('유저 정보를 가져오는데 실패했습니다.');
        }
        const result = data[0] as UserEntity;
        return mapperUserEntityToUserDto(result);
    }

    async deleteAccount(userId: number): Promise<void> {
        const { error } = await supabase.from('users').update({ deleted_at: new Date() }).eq('id', userId);
        if (error) {
            throw error;
        }
    }
}

export const profileApi = new ProfileApi();