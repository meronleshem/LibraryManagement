import { observer } from "mobx-react-lite";
import { Grid, GridColumn, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({profile}: Props) {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header as='h1' content={profile.name} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Currently Borrowing' value='2' />
                    </Statistic.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})