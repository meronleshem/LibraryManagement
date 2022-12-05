import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Book } from '../models/book';
import NavBar from './NavBar';
import BooksDashboard from '../../features/books/dashboard/BooksDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

  function handleFormOpen(id?: string){
    id ? handleSelectedBook(id) : handleCloseSelectedBook();
    setEditMode(true);
  }

  function handleFormClose(id?: string){
    setEditMode(false);
  }

  function handleCreateBook(book: Book){
    setBooks([...books, {...book, id: uuid()}]);
    setEditMode(false);
    setSelectedBook(book);
  }

  function handleDeleteBook(id: string){
    setBooks([...books.filter(b => b.id !== id)]);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ margin: '7em' }}>
        <BooksDashboard
         books={books}
         selectedBook={selectedBook}
         selectBook={handleSelectedBook}
         closeSelected={handleCloseSelectedBook}
         editMode={editMode}
         openForm={handleFormOpen}
         closeForm={handleFormClose}
         createBook={handleCreateBook}
         deleteBook={handleDeleteBook}
         />
      </Container>
    </Fragment>

  );
}

export default App;
