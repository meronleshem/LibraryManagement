import axios, { AxiosResponse } from 'axios';
import { Book } from '../models/book';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/';

axios.interceptors.response.use(async response => {
    try {
        await sleep(200);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete(url).then<T>(responseBody)
}

const Books = {
    list: () => requests.get<Book[]>('/books'),
    details: (id: string) => requests.get<Book>(`/books/${id}`),
    create: (book: Book) => requests.post<void>('/books', book),
    update: (book: Book) => requests.put<void>(`/books/${book.id}`, book),
    delete: (id:string) => requests.del<void>(`/books/${id}`)
}

const agent = {
    Books
}

export default agent;