import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Book } from '../../../app/models/book'

interface Props {
    book: Book
}

export default function ActivityDeatils({book}: Props) {

    return (
        <Card>
            <Image size='small' centered src={book.image} />
            <Card.Content>
                <Card.Header>{book.title}</Card.Header>
                <Card.Meta>
                    <span>{book.author}</span>
                </Card.Meta>
                <Card.Description>
                    {book.year}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    {/* <Button basic color='blue' content='Edit' /> */}
                    <Button basic color='grey' content='Close' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}