//import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/Books.png" alt="logo" style={{marginRight: '10px'}}/>
                    Library Home
                </Menu.Item>
                <Menu.Item as={NavLink} to='/books' name='Books' />
                <Menu.Item>
                    <Button as={NavLink} to='/createBook' positive content='Add Book' />
                </Menu.Item>

            </Container>
        </Menu>
    )
}