import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import BooksDashboard from '../../features/books/dashboard/BooksDashboard';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';

function App() {

  const {bookStore} = useStore();

  useEffect(() => {
    bookStore.loadBooks();
  }, [bookStore])

  if (bookStore.loadingInitial) return <LoadingComponent />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ margin: '7em' }}>
        <BooksDashboard />
      </Container>
    </Fragment>

  );
}

export default observer(App);
