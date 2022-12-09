import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import BookDetails from '../details/BookDetails';
import BookForm from '../forms/BookForm';
import BookList from './BookList';

export default observer(function BooksDashboard() {

    const { bookStore } = useStore();
    const {selectedBook: selectedBook, editMode: editMode} = bookStore;
    return (
        <Grid>
            <Grid.Column width='7'>
                <BookList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedBook &&
                    <BookDetails />}
                {editMode &&
                    <BookForm />}
            </Grid.Column>
        </Grid>
    )
})