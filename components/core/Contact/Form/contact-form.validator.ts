import * as yup from 'yup';
import 'yup-phone-lite';

export const contactForm = yup.object({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().phone('FR').required(),
  message: yup.string().trim().required(),
});

export const initialValues: contactFormTypes = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  phone: '',
};

export interface contactFormTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
