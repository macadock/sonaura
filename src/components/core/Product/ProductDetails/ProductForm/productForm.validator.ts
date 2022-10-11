import * as yup from 'yup';

export const productFormSchema = yup.object({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  phone: yup.string().trim().min(10).required(),
  message: yup.string().trim().required(),
  gdpr: yup.boolean().isTrue().required(),
});

export const initialValues: productFormTypes = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  gdpr: false,
};

export interface productFormTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  gdpr: boolean;
}
