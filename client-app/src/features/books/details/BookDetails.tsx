import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'

export default observer(function ActivityDeatils() {
    const { bookStore } = useStore();
    const { selectedBook: book, loadBook, loadingInitial } = bookStore;
    const { id } = useParams();

    useEffect(() => {
        if (id)
            loadBook(id);
    }, [id, loadBook])

    if(loadingInitial || !book) 
        return <LoadingComponent />;

    if (!book) return <LoadingComponent />;

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