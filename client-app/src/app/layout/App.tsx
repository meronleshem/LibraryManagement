import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Book } from '../models/book';
import NavBar from './NavBar';
import BooksDashboard from '../../features/books/dashboard/BooksDashboard';


function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    axios.get<Book[]>('http://localhost:5000/books').then(response => {
      console.log(response);
      setBooks(response.data);
    })
  }, [])

  function handleSelectedBook(id: string){
    setSelectedBook(books.find(b => b.id === id));
  }

  function handleCloseSelectedBook(){
    setSelectedBook(undefined);
  }

  return (
    <Fragment>
      <NavBar />
      <Container style={{ margin: '7em' }}>
        <BooksDashboard
         books={books}
         selectedBook={selectedBook}
         selectBook={handleSelectedBook}
         closeSelected={handleCloseSelectedBook}
         />
      </Container>
    </Fragment>

  );
}

export default App;
