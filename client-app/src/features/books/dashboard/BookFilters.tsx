import { observer } from 'mobx-react-lite';
import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer( function BookFilters() {
    const {bookStore: {predicate, setPredicate}} = useStore();

    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 28}}>
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item content='All Books' active={predicate.has('all')} 
                    onClick={() => setPredicate('all', 'true')} />
                <Menu.Item content="I'm Borrowing" active={predicate.has('isBorrowing')}
                     onClick={() => setPredicate('isBorrowing', 'true')}/>
                <Menu.Item content='Only Available' active={predicate.has('isAvailable')} 
                    onClick={() => setPredicate('isAvailable', 'true')}/>
            </Menu>
            <Header />
        </>

    )
})