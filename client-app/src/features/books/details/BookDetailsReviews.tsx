import { Form, Formik } from 'formik';
import { link } from 'fs';
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Button } from 'semantic-ui-react'
import ValidateTextInput from '../../../app/common/form/ValidateTextInput';
import { ChatComment } from '../../../app/models/comment';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';

interface Props {
    comments: ChatComment[];
}

export default observer(function BookDetailsReviews({ comments }: Props) {
    const { bookStore } = useStore();

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='blue'
                style={{ border: 'none' }}
            >
                <Header>Users Reviews</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src='/assets/user.png' />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.name}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.createdAt}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}

                    <Formik onSubmit={(values, { resetForm }) =>
                        bookStore.addComment(values.contentComment).then(() => resetForm())}
                        initialValues={{ contentComment: '' }}
                        validationSchema={Yup.object({
                            contentComment: Yup.string().required()
                        })}
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form className='ui form'>
                                <br />
                                <ValidateTextInput placeholder='Add comment' name='contentComment' />
                                <Button
                                    loading={isSubmitting}
                                    disabled={isSubmitting || !isValid}
                                    content='Add Reply'
                                    labelPosition='left'
                                    icon='edit'
                                    primary
                                    type='submit'
                                />
                            </Form>
                        )}
                    </Formik>

                </Comment.Group>
            </Segment>
        </>

    )
})
