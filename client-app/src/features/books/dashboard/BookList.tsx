import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Book } from '../../../app/models/book';
import { useStore } from '../../../app/stores/store';


export default observer(function BookList() {

    const {bookStore} = useStore();
    const {deleteBook, booksArray} = bookStore;

    return (
        <Segment>
            <Item.Group divided >
                 {booksArray.map(book =>(
                   <Item key={book.id}>
                    <Item.Content>
                        <Item.Header as='a'>{book.title}</Item.Header>
                        <Item.Meta>{book.author}</Item.Meta>
                        <Item.Description>
                           {book.year}
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => bookStore.selectBook(book.id)} floated='right' content='Details' color='blue' />
                            <Button onClick={() => deleteBook(book.id)} floated='right' content='Delete' color='red' />
                            <Label basic content={book.genere} />
                        </Item.Extra>
                    </Item.Content>
                   </Item> 
                 ))}
            </Item.Group>
        </Segment>

    )
})