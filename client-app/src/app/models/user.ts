export interface User {
    username: string;
    name: string;
    token: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    name?: string;
}