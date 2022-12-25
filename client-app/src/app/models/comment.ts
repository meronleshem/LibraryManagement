export interface ChatComment {
    id: number;
    createdAt: any;
    content: string;
    username: string;
    name: string;
}

export class CommentContent {
    content: string;
    
    constructor(content: string) {
       this.content = content;
    }
}