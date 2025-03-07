export type IdeaEntity = {
    id: number,
    user_id: number,
    created_at: Date,
    title: string,
    description: string,
    prompt_id: number
}

export type IdeaJoinTagsEntity = IdeaEntity & {
    tags: string
}
