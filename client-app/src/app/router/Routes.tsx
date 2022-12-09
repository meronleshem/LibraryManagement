import { createBrowserRouter, RouteObject } from "react-router-dom";
import BooksDashboard from "../../features/books/dashboard/BooksDashboard";
import BookDetails from "../../features/books/details/BookDetails";
import BookForm from "../../features/books/forms/BookForm";
import HomePage from "../../features/books/home/HomePage";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'books', element: <BooksDashboard />},
            {path: 'books/:id', element: <BookDetails />},
            {path: 'createBook', element: <BookForm key='create' />},
            {path: 'edit/:id', element: <BookForm key='edit' />}
        ]
    }
]

export const router = createBrowserRouter(routes);