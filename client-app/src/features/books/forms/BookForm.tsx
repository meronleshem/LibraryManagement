import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Book } from "../../../app/models/book";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import ValidateTextInput from "../../../app/common/form/ValidateTextInput";
import ValidateSelectInput from "../../../app/common/form/ValidateSelectInput";
import { genereOptions } from "../../../app/common/options/GenereOptions";

export default observer(function BookForm() {
    const { bookStore } = useStore();
    const { createBook, updateBook, loadBook, loadingInitial } = bookStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const currYear = new Date().getFullYear();


    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        author: '',
        year: undefined,
        genere: '',
        totalQuantity: undefined,
        availableQuantity: undefined,
        image: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The book title is required'),
        author: Yup.string().required('The author is required'),
        year: Yup.number().required().max(currYear),
        genere: Yup.string().required(),
        totalQuantity: Yup.number().required().min(0),
        availableQuantity: Yup.number().required().min(0),
        image: Yup.string().required()
    })

    useEffect(() => {
        if (id)
            loadBook(id).then(book => setBook(book!));
    }, [id, loadBook]);

    function handleFormSubmit(book: Book) {
        if (!book.id) {
            book.id = uuid();
            createBook(book).then(() => navigate(`/books/${book.id}`))
        } else {
            updateBook(book).then(() => navigate(`/books/${book.id}`))
        }
    }

    if (loadingInitial)
        return <LoadingComponent />

    return (
        <Segment clearing>
            <Header content='Book Details' sub color="blue" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={book}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ValidateTextInput name='title' placeholder="Title" />
                        <ValidateTextInput placeholder='Author' name='author' />
                        <ValidateTextInput placeholder='Year' name='year' />
                        <ValidateSelectInput options={genereOptions} placeholder='Genere' name='genere' />
                        <ValidateTextInput placeholder='Total Quantity' name='totalQuantity' />
                        <ValidateTextInput placeholder='Available Quantity' name='availableQuantity' />
                        <ValidateTextInput placeholder='Image' name='image' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid }
                            floated="right" positive type='submit' content='Submit' />
                        <Button as={Link} to={'/books'} floated="right" type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})