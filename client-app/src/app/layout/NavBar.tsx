//import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/books'>
                    <img src="/assets/Books.png" alt="logo" style={{ marginRight: '10px' }} />
                    Catalog
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createBook' positive content='Add Book' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src='/assets/user.png' avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.name}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='Your Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})