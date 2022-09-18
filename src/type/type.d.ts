export interface GitUserType {
    avatar_url: string
    bio: any
    email: any
    url: string
    followers: number
    public_repos: number
    repos_url: string
    type: string
    name: string| null
    id: number

    [key: string]: any
}