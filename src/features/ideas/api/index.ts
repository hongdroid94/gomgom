import { supabase } from '../../../app';
import { IdeaJoinTagsEntity } from '../../../entities/idea/entity';

class IdeaApi {
    async findAllIdeaByUserId(userId: number) {
        const { data, error } = await supabase.rpc('get_ideas_by_user', { user_param: userId });
        if (error) throw error;
        return data as IdeaJoinTagsEntity[];
    }

}

export const ideaApi = new IdeaApi();