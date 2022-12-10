import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Book } from '../../../app/models/book';
import { useStore } from '../../../app/stores/store';

interface Props {
    book: Book
}

export default function BookListItem({ book }: Props) {
    const { bookStore } = useStore();
    const { deleteBook, booksArray } = bookStore;

    return (
        // <Item key={book.id}>
        //     <Item.Content>
        //         <Item.Header as='a'>{book.title}</Item.Header>
        //         <Item.Meta>{book.author}</Item.Meta>
        //         <Item.Description>
        //             {book.year}
        //         </Item.Description>
        //         <Item.Extra>
        //             {/* <Button onClick={() => bookStore.selectBook(book.id)} floated='right' content='Details' color='blue' /> */}
        //             <Button as={Link} to={`/books/${book.id}`} floated='right' content='Details' color='blue' />
        //             <Button onClick={() => deleteBook(book.id)} floated='right' content='Delete' color='red' />
        //             <Label basic content={book.genere} />
        //         </Item.Extra>
        //     </Item.Content>
        // </Item>

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={book.image} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/books/${book.id}`}>
                                {book.title}
                            </Item.Header>
                            <Item.Description>
                                <div>
                                <Icon name='user outline' />   {book.author}
                                </div>
                                <div>
                                <Icon name='calendar alternate outline' /> {book.year}
                                </div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <span>
                    Available Quantity: {book.availableQuantity}
                </span>
                <span>
                    <Button as={Link} to={`/books/${book.id}`} color='blue' floated='right' content='Details' />
                </span>
            </Segment>
        </Segment.Group>
    )
}