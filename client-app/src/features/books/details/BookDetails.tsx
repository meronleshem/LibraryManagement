import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'

export default function ActivityDeatils() {
    const {bookStore} = useStore();
    const {selectedBook: book, cancelSelectedBook: closeSelected} = bookStore;

    if(!book) return <LoadingComponent/>;

    return (
        <Card>
            <Image size='small' centered src={book.image} />
            <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>
                    <span>{book.author}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{book.year} </div>
                    <div>Available Quantity: {book.availableQuantity}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Order' />
                    <Button onClick={closeSelected} basic color='grey' content='Close' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}