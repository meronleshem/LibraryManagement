import { Tab } from "semantic-ui-react";

export default function ProfileContent() {
    const panes = [
        {menuItem: 'Books', render: () => <Tab.Pane>Books</Tab.Pane>},
        {menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane>}
    ];

    return (
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
}