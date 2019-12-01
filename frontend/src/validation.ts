import * as Yup from "yup";

export const saveSetSchema = Yup.object().shape({
    nickName: Yup.string()
        .required('Nick jest wymagany!')
        .max(50, 'Za długi nick! Maksymalna długość: 50 znaków'),
    cardSetName: Yup.string()
        .required('Nazwa zestawu jest wymagana!')
        .max(50, 'Za długi nick! Maksymalna długość: 50 znaków'),
});