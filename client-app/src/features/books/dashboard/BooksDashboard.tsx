import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Book } from '../../../app/models/book';
import BookDetails from '../details/BookDetails';
import BookForm from '../forms/BookForm';
import BookList from './BookList';

interface Props{
    books: Book[]
    selectedBook: Book | undefined;
    selectBook: (id: string) => void;
    closeSelected: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createBook: (book: Book) => void;
    deleteBook: (id: string) => void;
}

export default function BooksDashboard({books, selectedBook, selectBook, closeSelected,
    editMode, openForm, closeForm, createBook, deleteBook} : Props){
    return(
        <Grid>
        <Grid.Column width='7'>
            <BookList books={books} selectBook={selectBook} deleteBook={deleteBook}/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedBook &&  
            <BookDetails book={selectedBook} closeSelected={closeSelected} />}
            {editMode &&
            <BookForm closeForm={closeForm} createBook={createBook}/>}
        </Grid.Column>
    </Grid>
    )
}