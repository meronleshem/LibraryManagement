import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Book } from '../../../app/models/book';
import BookDetails from '../details/BookDetails';
import BookList from './BookList';

interface Props{
    books: Book[]
    selectedBook: Book | undefined;
    selectBook: (id: string) => void;
    closeSelected: () => void;
}

export default function BooksDashboard({books, selectedBook, selectBook, closeSelected} : Props){
    return(
        <Grid>
        <Grid.Column width='10'>
            <BookList books={books} selectBook={selectBook}/>
        </Grid.Column>
        <Grid.Column width='6'>
            {selectedBook && 
            <BookDetails book={selectedBook} />}
        </Grid.Column>
    </Grid>
    )
}