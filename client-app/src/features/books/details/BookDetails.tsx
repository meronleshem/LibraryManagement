import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'
import BookDetailsHeader from './BookDetailsHeader';
import BookDetailsHeder from './BookDetailsHeader';
import BookDetailsInfo from './BookDetailsInfo';
import BookDetailsReviews from './BookDetailsReviews';
import BookDetailsSideBar from './BookDetailsSideBar';

export default observer(function ActivityDeatils() {
    const { bookStore } = useStore();
    const { selectedBook: book, loadBook, loadingInitial } = bookStore;
    const { id } = useParams();

    useEffect(() => {
        if (id)
            loadBook(id);
    }, [id, loadBook])

    if(loadingInitial || !book) 
        return <LoadingComponent />;

    if (!book) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <BookDetailsHeader book={book}/>
               {/* <BookDetailsInfo /> */}
                <BookDetailsReviews />
            </Grid.Column>
            <Grid.Column width={6}>
                <BookDetailsSideBar book={book} />
            </Grid.Column>
        </Grid>
    )
})