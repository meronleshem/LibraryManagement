export interface User {
    username: string;
    name: string;
    token: string;
    isAdmin: boolean;
}

export interface UserFormValues {
    email: string;
    password: string;
    name?: string;
}