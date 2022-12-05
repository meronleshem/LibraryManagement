import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Book } from '../../../app/models/book';

interface Props {
    books : Book[];
    selectBook: (id: string) => void;
    deleteBook: (id: string) => void;
}

export default function BookList({books, selectBook, deleteBook}: Props) {
    return (
        <Segment>
            <Item.Group divided >
                 {books.map(book =>(
                   <Item key={book.id}>
                    <Item.Content>
                        <Item.Header as='a'>{book.title}</Item.Header>
                        <Item.Meta>{book.author}</Item.Meta>
                        <Item.Description>
                           {book.year}
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectBook(book.id)} floated='right' content='Details' color='blue' />
                            <Button onClick={() => deleteBook(book.id)} floated='right' content='Delete' color='red' />
                            <Label basic content={book.genere} />
                        </Item.Extra>
                    </Item.Content>
                   </Item> 
                 ))}
            </Item.Group>
        </Segment>

    )
}