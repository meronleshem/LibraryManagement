import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/Books.png' alt='logo' style={{ marginBottom: 12 }} />
                    Meron's Library
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2'  inverted content='Welcome' />
                        <Button as={Link} to='/books' size='huge' inverted>
                            Go to Catalog
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} to='/login' size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} to='/login' size='huge' inverted>
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})