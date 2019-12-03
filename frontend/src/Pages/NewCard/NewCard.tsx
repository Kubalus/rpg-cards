import React from 'react';
import './NewCard.css';
import {Field, FieldProps, Form, Formik, FormikProps} from "formik";
import {Button, FormControl, TextField, Select, InputLabel, MenuItem} from "@material-ui/core";
import {toast} from "react-toastify";
import {useApolloClient} from "react-apollo-hooks";
import {CardType} from "../../generated/graphql";
// @ts-ignore
import validator from 'validate-image-url';
import CardComponent from "../../components/CardComponent";

const isValidURL = async (url: string) => await validator({url, timeout: 2000});

type FormValues = {
    cardName: string;
    nickName: string;
    type: CardType;
    imageURL: string;
}

const initialValues: FormValues = {
    nickName: '',
    cardName: '',
    type: CardType.Item,
    imageURL: ''
};

const NewCard: React.FC = () => {
    const client = useApolloClient();
    // const [ addSetMutation ] = useAddSetMutation({
    //     client,
    //     onError: error => toast.error(error.message)
    // });

    const handleSubmit = async (values: FormValues) => {
        try {
            // await saveSetSchema.validate(values);
            // await addSetMutation({
            //     variables: {
            //         author: values.nickName,
            //         title: values.cardSetName,
            //         antagonistCard: cardSet.antagonistCard.id,
            //         itemCard: cardSet.itemCard.id,
            //         companionCard: cardSet.companionCard.id,
            //         genreCard: cardSet.genreCard.id,
            //         placeCard: cardSet.placeCard.id,
            //     }
            // });
            isValidURL(values.imageURL).catch(err => {
                throw new Error('Niepoprawny adres obrazka')
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
                <>
                    <CardComponent
                        card={{
                            type: formikProps.values.type,
                            title: formikProps.values.cardName,
                            author: formikProps.values.nickName,
                            imageURL: formikProps.values.imageURL,
                            id: '',
                        }}
                        cardRef={null}
                        symbolRef={null}
                    />
                    <Form className='SaveForm' style={{ marginTop: 50 }}>
                        <Field name='cardName'>
                            {({field}: FieldProps) =>
                                <TextField {...field} style={{margin: 16}} variant="outlined" label={'Card name'}/>}
                        </Field>
                        <Field name='nickName'>
                            {({field}: FieldProps) =>
                                <TextField {...field} style={{margin: 16}} variant="outlined" label={'Nickname'}/>}
                        </Field>
                        <Field name='imageURL'>
                            {({field}: FieldProps) =>
                                <TextField {...field} style={{margin: 16}} variant="outlined" label={'Image URL'}/>}
                        </Field>
                        <Field name='type'>
                            {({field}: FieldProps) => (
                                <FormControl>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={field.value}
                                        {...field}
                                        variant={'outlined'}
                                    >
                                        <MenuItem value={CardType.Item}>Przedmiot</MenuItem>
                                        <MenuItem value={CardType.Place}>Miejsce</MenuItem>
                                        <MenuItem value={CardType.Genre}>Gatunek</MenuItem>
                                        <MenuItem value={CardType.Companion}>Towarzysz</MenuItem>
                                        <MenuItem value={CardType.Antagonist}>Antagonista</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Field>
                        <Button type="submit" style={{margin: 16, width: '32pxs'}} variant="contained"
                                color="primary">Zapisz</Button>
                    </Form>
                </>}
        </Formik>
    );
};

export default NewCard;
