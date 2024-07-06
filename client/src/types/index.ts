export type GroupType = {
    id: string
    avatar: string
    name: string
    users: UserType[],
    threads: [],
    createdAt: Number
    updatedAt: Number,
    isSelected?: boolean;
    index?: Number;
    onClickCb?: (index: Number) => void;
}

export type UserType = {
    id: string
    name: string
    avatar: String,
}


