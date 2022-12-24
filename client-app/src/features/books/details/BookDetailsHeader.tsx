import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Card } from 'semantic-ui-react'
import { Book } from '../../../app/models/book';
import { useStore } from '../../../app/stores/store';

interface Props {
    book: Book
}

export default observer(function BookDetailsHeader({ book }: Props) {
    const {bookStore: {updateBorrow}} = useStore();

    let borrowButton;

    if(book.isBorrowing)
        borrowButton =<Button onClick={updateBorrow} basic color='red' content='Return' />
    else{
        if(book.availableQuantity == 0)
            borrowButton = <Button onClick={updateBorrow} basic color='blue' content='Borrow' disabled />
        else
            borrowButton = <Button onClick={updateBorrow} basic color='blue' content='Borrow'/>
    }

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
                    {borrowButton}
                    <Button as={Link} to={`/edit/${book.id}`} basic color='grey' content='Edit' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})


// import { observer } from 'mobx-react-lite';
// import React from 'react'
// import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
// import { Book } from '../../../app/models/book';

// const activityImageStyle = {
    
// };

// const activityImageTextStyle = {
//     position: 'absolute',
//     bottom: '5%',
//     left: '5%',
//     width: '100%',
//     height: '50',
//     color: 'white'
// };

// interface Props {
//     book: Book
// }

// export default observer (function ActivityDetailedHeader({book}: Props) {
//     return (
//         <Segment.Group>
//             <Segment basic attached='top' style={{padding: '0'}}>
//                 <Image size='medium' src={book.image} fluid style={activityImageStyle}/>
//                 {/* <Segment style={activityImageTextStyle} basic>
//                     <Item.Group>
//                         <Item>
//                             <Item.Content>
//                                 <Header
//                                     size='huge'
//                                     content={book.title}
//                                     style={{color: 'white'}}
//                                 />
//                             </Item.Content>
//                         </Item>
//                     </Item.Group>
//                 </Segment> */}
//             </Segment>
//             <Segment secondary>
                
//             </Segment>
//             <Segment clearing attached='bottom'>
//                 <Button color='blue'>Borrow</Button>
//                 <Button color='orange' floated='right'>
//                     Edit
//                 </Button>
//             </Segment>
//         </Segment.Group>
//     )
// })
