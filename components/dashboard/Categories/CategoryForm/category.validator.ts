import { InsertOrUpdateCategory } from 'components/dashboard/Categories/CategoryForm';
import * as yup from 'yup';

export const categoryForm = yup.object({
  name: yup.string().trim().required(),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g)
    .required(),
});

export const initialValues: InsertOrUpdateCategory = {
  name: '',
  slug: '',
  icon: '',
};
