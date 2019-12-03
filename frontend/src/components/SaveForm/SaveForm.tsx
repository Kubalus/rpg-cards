import React from 'react';
import './SaveForm.css';
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";
import {Button, TextField} from "@material-ui/core";
import {toast} from "react-toastify";
import {saveSetSchema} from "./../../validation";
import {RandomCardsSet} from "../../Pages/Choosing/utils";
import {useApolloClient} from "react-apollo-hooks";
import {useAddSetMutation} from "../../generated/graphql";

type FormValues = {
    cardSetName: string;
    nickName: string;
}

const initialValues = {
    nickName: '',
    cardSetName: '',
};

type Props = {
    cardSet: RandomCardsSet;
}

const SaveForm: React.FC<Props> = ({cardSet}) => {
    const client = useApolloClient();
    const [ addSetMutation ] = useAddSetMutation({
        client,
        onError: error => toast.error(error.message)
    });

    const handleSubmit = async (values: FormValues) => {
        try {
            await saveSetSchema.validate(values);
            await addSetMutation({
                variables: {
                    author: values.nickName,
                    title: values.cardSetName,
                    antagonistCard: cardSet.antagonistCard.id,
                    itemCard: cardSet.itemCard.id,
                    companionCard: cardSet.companionCard.id,
                    genreCard: cardSet.genreCard.id,
                    placeCard: cardSet.placeCard.id,
                }
            });
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
                    <Button type="submit" style={{margin: 16, width: '32pxs'}} variant="contained"
                            color="primary">Zapisz</Button>
                </Form>}
        </Formik>
    );
};

export default SaveForm;
