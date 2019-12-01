import React from 'react';
import './SaveForm.css';
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";
import {Button, TextField} from "@material-ui/core";
import {toast} from "react-toastify";
import {saveSetSchema} from "./../../validation";

type FormValues = {
    cardSetName: string;
    nickName: string;
}

const initialValues = {
    nickName: '',
    cardSetName: '',
};

const SaveForm: React.FC = () => {
    const handleSubmit = async (values: FormValues) => {
        try {
            await saveSetSchema.validate(values);
            // TODO: api call
        } catch (error) {
            if (error.errors) {
                error.errors.forEach((message: string) => toast.error(message));
            }
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formikProps: FormikProps<FormValues>) =>
                <Form className='SaveForm'>
                    <Field name='cardSetName'>
                        {({field}: FieldProps) =>
                            <TextField {...field} style={{margin: 16}} variant="outlined" label={'Nazwa zestawu'}/>}
                    </Field>
                    <Field name='nickName'>
                        {({field}: FieldProps) =>
                            <TextField {...field} style={{margin: 16}} variant="outlined" label={'Nickname'}/>}
                    </Field>
                    <Button type="submit" style={{margin: 16, width: '32pxs'}} variant="contained" color="primary">Zapisz</Button>
                </Form>}
        </Formik>
    );
};

export default SaveForm;
