import { User } from "./user";

export interface Profile {
    username: string;
    name: string;
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.name = user.name;
    }
}