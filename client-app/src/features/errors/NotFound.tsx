import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we have looked everywhere but could not find what you are looking for
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/books'>
                    Return to the catalog
                </Button>
            </Segment.Inline>
        </Segment>
    )
}


// import React from 'react';
// import { Header, Icon, Segment } from 'semantic-ui-react';

// const NotFound = () => (
//   <Segment placeholder>
//     <Header icon>
//       <Icon name='search' />
//       Oops - we couldn't find this page!
//     </Header>
//   </Segment>
// );

// export default NotFound;