import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import BookFilters from './BookFilters';
import BookList from './BookList';

export default observer(function BooksDashboard() {
    const { bookStore } = useStore();
    const { loadBooks, books, setPagingParams, pagination } = bookStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGedNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadBooks().then(() => setLoadingNext(false));
    }

    let bookList;
    useEffect(() => {
        if (books.size <= 1)
            loadBooks();
    }, [bookStore, books.size])

    if (bookStore.loadingInitial && !loadingNext) return <LoadingComponent />

    bookList = <BookList />

    return (
        <Grid>
            <Grid.Column width='7'>
                {bookList}
                <Button floated='right' content="More.." positive onClick={handleGedNext} loading={loadingNext}
                    disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <BookFilters />
            </Grid.Column>
        </Grid>
    )
})