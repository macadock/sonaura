import * as yup from 'yup';

export const newsletterForm = yup.object({
  email: yup.string().trim().email().required(),
});

export const initialValues: newsletterFormTypes = {
  email: '',
};

export interface newsletterFormTypes {
  email: string;
}
