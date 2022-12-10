import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
//import React, { SyntheticEvent, useState } from 'react';
import { Header, Item, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import BookListItem from './BookListItem';


export default observer(function BookList() {

    const { bookStore } = useStore();
    const { groupByGenere, booksArray } = bookStore;

    // console.log(`${groupByGenere}`);
    return (
        <>

            {groupByGenere.map(([group, books]) => (
                < Fragment key={group} >
                    <Header sub color='teal'>{group}</Header>
                    {books.map(book => (
                        <BookListItem key={book.id} book={book} />
                    ))}
                </Fragment>
            ))}

        </>


    )
})