import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Profile } from '../../../app/models/Profile'
import { Book } from '../../../app/models/book'

interface Props {
    book: Book;
}

export default observer(function BookDetailsSideBar({ book: {borrowers, isBorrowing} }: Props) {
    if(!borrowers) return null;

    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='blue'
            >
                {borrowers.length} {borrowers.length === 1 ? 'Person' : 'Persons'} Borrowing
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {borrowers.map(borrower => (
                        <Item key={borrower.username} style={{ position: 'relative' }}>
                            {isBorrowing && 
                            <Label style={{ position: 'absolute'}} color='green' ribbon='right'>
                                You
                            </Label>}
                            <Image size='mini' src={'/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${borrower.username}`}>{borrower.name}</Link>
                                </Item.Header>
                                {/* <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra> */}
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})