import React, { Fragment, useEffect, useState } from 'react';
import { Container, Header, List } from 'semantic-ui-react';
import { Book } from '../models/book';
import NavBar from './NavBar';
import BooksDashboard from '../../features/books/dashboard/BooksDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Books.list().then(response => {
      console.log(response);
      setBooks(response);
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
    setSubmitting(true);
    book.id = uuid();
    agent.Books.create(book).then(() => {
      setBooks([...books, {...book, id: uuid()}]);
      setEditMode(false);
      setSelectedBook(book);
    })
  }

  function handleDeleteBook(id: string){
    agent.Books.delete(id).then(() => {
      setBooks([...books.filter(b => b.id !== id)]);
    })
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
         submitting={submitting}
         />
      </Container>
    </Fragment>

  );
}

export default App;
