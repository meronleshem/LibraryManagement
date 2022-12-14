import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Card } from 'semantic-ui-react'
import { Book } from '../../../app/models/book';

interface Props {
    book: Book
}

export default observer(function BookDetailsHeader({ book }: Props) {
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
                    <Button as={Link} to={`/edit/${book.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/books'} basic color='grey' content='Close' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})
