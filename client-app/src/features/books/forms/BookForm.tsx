import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Book } from "../../../app/models/book";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';

export default observer(function BookForm() {
    const { bookStore } = useStore();
    const { createBook, updateBook, loadBook, loadingInitial } = bookStore;
    const { id } = useParams();
    const navigate = useNavigate()
    

    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        author: '',
        year: 0,
        genere: '',
        availableQuantity: 0,
        image: ''
    })

    useEffect(() => {
        if (id)
            loadBook(id).then(book => setBook(book!));
    }, [id, loadBook]);

    function handleSubmit() {
        if(!book.id){
            book.id = uuid();
            createBook(book).then(() => navigate(`/books/${book.id}`))
        } else {
            updateBook(book).then(() => navigate(`/books/${book.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    }

    if (loadingInitial)
        return <LoadingComponent />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={book.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Author' value={book.author} name='author' onChange={handleInputChange} />
                <Form.Input placeholder='Year' value={book.year} name='year' onChange={handleInputChange} />
                <Form.Input placeholder='Genere' value={book.genere} name='genere' onChange={handleInputChange} />
                <Form.Input placeholder='Quantity' value={book.availableQuantity} name='availableQuantity' onChange={handleInputChange} />
                <Form.Input placeholder='Image' value={book.image} name='image' onChange={handleInputChange} />
                <Button floated="right" positive type='submit' content='Submit' />
                <Button as={Link} to={'/books'}  floated="right" type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})