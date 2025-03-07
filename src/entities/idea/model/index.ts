export type IdeaDto = {
    id: number,
    userId: number,
    createdAt: Date,
    title: string,
    description: string,
    promptId: number
}

export type IdeaJoinTagsDto = IdeaDto & {
    tags: string
}
