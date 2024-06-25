export type GroupType = {
    id: string
    avatar: string
    name: string
    users: UserType[],
    threads: [],
    createdAt: Number
    updatedAt: Number
}

export type UserType = {
    id: string
    name: string
    avatar: String,
}


