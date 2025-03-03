export type RequestProfileUpdateDto = {
    nickname:string,
    userId:number,
    file?:File,
    profileUrl?:string
}