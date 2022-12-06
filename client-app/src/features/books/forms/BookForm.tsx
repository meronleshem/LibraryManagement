import React, { ChangeEvent, useState } from "react";
import {Button, Form, Segment} from 'semantic-ui-react';
import { Book } from "../../../app/models/book";

interface Props{
    closeForm: () => void;
    createBook: (book: Book) => void;
    submitting: boolean;
}

export default function BookForm({ closeForm, createBook, submitting}: Props) {

    const initialState = {
        id: '',
        title: '',
        author: '',
        year: 0,
        genere: '',
        availableQuantity: 0,
        image: ''
    }
    
    const [book, setBook] = useState(initialState);

    function handleSubmit() {
        createBook(book);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setBook({...book, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' onChange={handleInputChange}/>
                <Form.Input placeholder='Author' name='author' onChange={handleInputChange}/>
                <Form.Input placeholder='Year' name='year' onChange={handleInputChange}/>
                <Form.Input placeholder='Genere' name='genere' onChange={handleInputChange}/>
                <Form.Input placeholder='Quantity' name='availableQuantity' onChange={handleInputChange}/>
                <Form.Input placeholder='Image' name='image' onChange={handleInputChange}/>
                <Button floated="right" positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated="right" type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}