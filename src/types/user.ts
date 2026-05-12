export interface CreateUserRequest{
    name: string,
    email: string,
    password: string
}

export interface CreateUserResponse{
    id: string,
    name: string,
    email: string
}