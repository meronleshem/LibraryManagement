import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import BookFilters from './BookFilters';
import BookList from './BookList';

export default observer(function BooksDashboard() {
    const { bookStore } = useStore();
    const { loadBooks, books } = bookStore;

    useEffect(() => {
        if (books.size <= 1)
            loadBooks();
    }, [bookStore, books.size])

    if (bookStore.loadingInitial) return <LoadingComponent />

    return (
            <Grid>
                <Grid.Column width='7'>
                    <BookList />
                </Grid.Column>
                <Grid.Column width='6'>
                    <BookFilters />
                </Grid.Column>
            </Grid>
    )
})