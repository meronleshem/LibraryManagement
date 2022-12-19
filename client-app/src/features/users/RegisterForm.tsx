import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react"
import ValidateTextInput from "../../app/common/form/ValidateTextInput"
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ name: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error =>
                    setErrors({ error}))}
            validationSchema={Yup.object({
                name: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Register to Library' color="blue" textAlign="center" />
                    <ValidateTextInput placeholder="Name" name="name" />
                    <ValidateTextInput placeholder="Username" name="username" />
                    <ValidateTextInput placeholder="Email" name="email" />
                    <ValidateTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage
                        name="error" render={() => <ValidationError errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive content='Register' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})