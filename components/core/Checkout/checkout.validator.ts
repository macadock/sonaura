import * as yup from 'yup';
import 'yup-phone-lite';

export type Country = {
  code: string;
  label: string;
};

export const checkoutForm = yup.object({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup.string().phone('FR').required(),
  address: yup.string().trim().required(),
  country: yup.object().nullable().required(),
  city: yup.string().trim().required(),
  postalCode: yup
    .string()
    .required()
    .matches(/^[0-9]+$/)
    .length(5),
});

export const initialValues: checkoutFormTypes = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  country: null,
  city: '',
  postalCode: '',
};

export interface checkoutFormTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: Country | null;
  city: string;
  postalCode: string;
}
