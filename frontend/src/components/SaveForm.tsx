import React from 'react';
import './SaveForm.css';
import {Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";

type FormProps = {
    cardSetName: string;
    nickName: string;
}

const initialValues = {
    nickName: '',
    cardSetName: '',
};

const SaveForm: React.FC = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={() => {
        }}>
            <Form className='SaveForm'>
                    <TextField style={{margin: 16}} variant="outlined" label={'Nazwa zestawu'}/>
                    <TextField style={{margin: 16}} variant="outlined" label={'Nickname'}/>
                    <Button style={{margin: 16, width: '32pxs'}} variant="contained" color="primary">Zapisz</Button>
            </Form>
        </Formik>
    );
};

export default SaveForm;
