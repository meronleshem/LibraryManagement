import { makeAutoObservable, reaction, runInAction, values } from "mobx";
import agent from "../api/agent";
import { Book, BookFormValues } from "../models/book";
import { v4 as uuid } from 'uuid';
import { store } from "./store";
import { Profile } from "../models/Profile";
import { string } from "yup";
import { CommentContent } from "../models/comment";
import { Pagination, PagingParams } from "../models/pagination";

export default class BookStore {
    books = new Map<string, Book>();
    selectedBook: Book | undefined = undefined;
    editMode = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.books.clear();
                this.loadBooks();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string) => {
        this.predicate.clear();

        switch (predicate) {
            case 'all':
                this.predicate.set('all', true);
                break;
            case 'isBorrowing':
                this.predicate.set('isBorrowing', true);
                break;
            case 'isAvailable':
                this.predicate.set('isAvailable', true);
                break;
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        })
        return params;
    }

    get booksArray() {
        return Array.from(this.books.values());
    }

    get groupByGenere() {
        return Object.entries(
            this.booksArray.reduce((books, book) => {
                const genere = book.genere;
                books[genere] = books[genere] ? [...books[genere], book] : [book];
                return books;
            }, {} as { [key: string]: Book[] })
        )
    }

    loadBooks = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await agent.Books.list(this.axiosParams);
            result.data.forEach(book => {
                this.setBook(book);
            })
            this.setPagination(result.pagination);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadBook = async (id: string) => {
        let book = this.getBook(id);

        if (book) {
            this.selectedBook = book;
            return book;
        }
        else {
            this.setLoadingInitial(true);
            try {
                book = await agent.Books.details(id);
                this.setBook(book);
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

    private setBook = (book: Book) => {
        const user = store.userStore.user;
        if (user) {
            book.isBorrowing = book.borrowers!.some(
                u => u.username === user.username
            )
        }
        this.books.set(book.id, book);
    }

    private getBook = (id: string) => {
        return this.books.get(id);
    }

    createBook = async (book: BookFormValues) => {

        const user = store.userStore.user;
        const borrow = new Profile(user!);

        book.id = uuid();

        try {
            await agent.Books.create(book);
            const newBook = new Book(book);
            this.setBook(newBook);
            runInAction(() => {
                this.selectedBook = newBook;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateBook = async (book: BookFormValues) => {
        try {
            await agent.Books.update(book);
            runInAction(() => {
                if (book.id) {
                    let updatedBook = { ...this.getBook(book.id), ...book }
                    this.books.set(book.id, updatedBook as Book);
                    this.selectedBook = updatedBook as Book;
                }
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
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateBorrow = async () => {
        const user = store.userStore.user;
        try {
            await agent.Books.borrow(this.selectedBook!.id);
            runInAction(() => {
                if (this.selectedBook?.isBorrowing) {
                    this.selectedBook.borrowers = this.selectedBook.borrowers
                        ?.filter(b => b.username !== user?.username);
                    this.selectedBook.isBorrowing = false;
                } else {
                    const borrower = new Profile(user!);
                    this.selectedBook?.borrowers?.push(borrower);
                    this.selectedBook!.isBorrowing = true;
                }
                window.location.reload();
                this.books.set(this.selectedBook!.id, this.selectedBook!);
            })
        } catch (error) {
            console.log(error);
        }
    }

    addComment = async (commentContent: string) => {
        try {
            await agent.Books.comment(this.selectedBook?.id!, new CommentContent(commentContent));
            window.location.reload();
        }catch (error) {
            console.log(error);
        }
    }
}

