import { ChatComment } from "./comment";
import { Profile } from "./Profile";

export interface Book {
    id: string;
    title: string;
    author: string;
    genere: string;
    year: number | undefined;
    totalQuantity: number | undefined;
    availableQuantity: number | undefined;
    image: string;
    isBorrowing: boolean;
    borrowers: Profile[];
    comments: ChatComment[];
}

export class Book implements Book {
    constructor(init?: BookFormValues){
        Object.assign(this, init);
    }
}

export class BookFormValues {
    id?: string = undefined;
    title: string = '';
    author: string = '';
    genere: string = '';
    year: number | undefined = undefined;
    totalQuantity: number | undefined = undefined;
    availableQuantity: number | undefined = undefined;
    image: string = '';
    
    constructor(book?: BookFormValues) {
        if(book) {
            this.id = book.id;
            this.title = book.title;
            this.author = book.author;
            this.genere = book.genere;
            this.year = book.year;
            this.totalQuantity = book.totalQuantity;
            this.availableQuantity = book.availableQuantity;
            this.image = book.image;
        }
    }
}