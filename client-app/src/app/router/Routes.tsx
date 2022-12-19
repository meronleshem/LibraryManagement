import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import BooksDashboard from "../../features/books/dashboard/BooksDashboard";
import BookDetails from "../../features/books/details/BookDetails";
import BookForm from "../../features/books/forms/BookForm";
import HomePage from "../../features/books/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'books', element: <BooksDashboard />},
            {path: 'books/:id', element: <BookDetails />},
            {path: 'createBook', element: <BookForm key='create' />},
            {path: 'edit/:id', element: <BookForm key='edit' />},
            {path: 'login', element: <LoginForm />},
            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]

export const router = createBrowserRouter(routes);