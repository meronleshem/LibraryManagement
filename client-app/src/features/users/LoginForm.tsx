import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react"
import ValidateTextInput from "../../app/common/form/ValidateTextInput"
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch(error =>
                    setErrors({ error: 'invalid email or password' }))}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Library' color="blue" textAlign="center" />
                    <ValidateTextInput placeholder="Email" name="email" />
                    <ValidateTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage
                        name="error" render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>} 
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})