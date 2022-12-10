import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default function BookFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 28}}>
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item content='All Books' />
                <Menu.Item content='Above 2000' />
                <Menu.Item content='Only Fantasy' />
            </Menu>
            <Header />
        </>

    )
}