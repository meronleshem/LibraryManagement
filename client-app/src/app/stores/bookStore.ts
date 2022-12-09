import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Book } from "../models/book";
import { v4 as uuid } from 'uuid';

export default class BookStore {
    books = new Map<string, Book>();
    selectedBook: Book | undefined = undefined;
    editMode = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    
    get booksArray() {
        return Array.from(this.books.values());
    }

    loadBooks = async () => {
        this.setLoadingInitial(true);
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

    loadBook = async (id: string) => {
        let book = this.getBook(id);

        if(book) {
            this.selectedBook = book;
            return book;
        }
        else {
            this.setLoadingInitial(true);
            try {
                book = await agent.Books.details(id);
                this.books.set(book.id, book);
                runInAction(() => this.selectedBook = book);
                return book;
            } catch (error) {
                console.log(error);
            } finally {
                this.setLoadingInitial(false);
            }
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    private getBook = (id: string) => {
        return this.books.get(id);
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

    updateBook = async (book: Book) => {
        try {
            await agent.Books.update(book);
            runInAction(() => {
                this.books.set(book.id, book);
                this.selectedBook = book;
                this.editMode = false;
               // this.loading = false;
            })
        } catch (error) {
            console.log(error);
            // runInAction(() => {
            //     this.loading = false;
            // })
        }
    }

    deleteBook = async (id: string) => {

        try {
            await agent.Books.delete(id);
            runInAction(() => {
                this.books.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}

    