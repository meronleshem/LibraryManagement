import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";

interface Props {
    borrowers: Profile[];
}

export default observer(function BookListItemBorrower({ borrowers }: Props) {

    return (
        <List horizontal>
            {borrowers.map(borrower => (
                <List.Item key={borrower.username} as={Link} to={`/profiles/${borrower.username}`}>
                    <Image size='mini' circular src='/assets/user.png' />
                </List.Item>
            ))}
        </List>
    )
})