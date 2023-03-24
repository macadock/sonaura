import * as yup from 'yup';

export const categoryForm = yup.object({
  name: yup.string().trim().required(),
  slug: yup.string().trim().required(),
  icon: yup.string().trim().url().required(),
});

export const initialValues: categoryFormTypes = {
  name: '',
  slug: '',
  icon: '',
};

export interface categoryFormTypes {
  name: string;
  slug: string;
  icon: string;
}
