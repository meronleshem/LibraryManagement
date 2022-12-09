import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Book } from "../models/book";
import { v4 as uuid } from 'uuid';

export default class BookStore {
    // books: Book[] = [];
    books = new Map<string, Book>();
    selectedBook: Book | undefined = undefined;
    editMode = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    
    get booksArray() {
        return Array.from(this.books.values());
    }

    loadBooks = async () => {
        try{
            const books = await agent.Books.list();
            books.forEach(book =>{
                this.books.set(book.id, book);
            })
        }catch(error){
            console.log(error);
        } finally{
            this.setLoadingInitial(false);
        }
    } 

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectBook = (id: string) => {
        this.selectedBook = this.books.get(id);
    }

    cancelSelectedBook = () => {
        this.selectedBook = undefined;
    }

    openForm = () => {
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createBook = async (book: Book) => {
        book.id = uuid();

        try {
            await agent.Books.create(book);
            runInAction(() => {
                this.books.set(book.id, book);
                this.selectedBook = book;
                this.editMode = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteBook = async (id: string) => {

        try {
            await agent.Books.delete(id);
            runInAction(() => {
                this.books.delete(id);
                if (this.selectedBook?.id === id)
                    this.cancelSelectedBook();
            })
        } catch (error) {
            console.log(error);
        }
    }
}

    