import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/Books.png' alt='logo' style={{ marginBottom: 12 }} />
                    Meron's Library
                </Header>
                <Header as='h2' inverted content='Welcome' />
                <Button as={Link} to='/books' size='huge' inverted>
                    Take Me To The Catalog
                </Button>
            </Container>
        </Segment>
    )
}