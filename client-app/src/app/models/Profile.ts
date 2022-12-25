import { User } from "./user";

export interface Profile {
    username: string;
    name: string;
    books?: BookOnProfile[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.username = user.username;
        this.name = user.name;
    }
}

export interface BookOnProfile {
    id: string;
    url: string;
    image: string;
}