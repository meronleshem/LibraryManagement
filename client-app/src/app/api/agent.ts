import axios, { AxiosError, AxiosResponse } from 'axios';
import { config, off } from 'process';
import { toast } from 'react-toastify';
import { Book } from '../models/book';
import { User, UserFormValues } from '../models/user';
import { router } from '../router/Routes';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers)  {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(200);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modelStateErrors = [];
                for (const key in data.errors) {
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthuraized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }

    return Promise.reject(error);
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
    delete: (id: string) => requests.del<void>(`/books/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Books,
    Account
}

export default agent;