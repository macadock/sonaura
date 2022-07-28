import * as yup from 'yup';

export const productContactFormSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Merci d'enter votre nom complet")
    .max(50, "Merci d'enter votre nom complet")
    .required("Merci d'enter votre nom complet"),
  message: yup.string().trim().required("Merci d'écrire un message"),
  email: yup
    .string()
    .trim()
    .email("Merci d'entrer une adresse email valide")
    .required("L'email est requis"),
  phone: yup
    .string()
    .trim()
    .min(10, "Merci d'entrer un numéro de téléphone valide")
    .required("Merci d'entrer un numéro de téléphone valide"),
  gdpr: yup
    .boolean()
    .required('Nous avons besoin de votre consentement pour vous contacter'),
});

export const initialValues = {
  fullName: '',
  message: '',
  email: '',
  phone: '',
  gdpr: false,
};
