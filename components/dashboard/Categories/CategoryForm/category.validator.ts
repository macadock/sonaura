import * as yup from 'yup';
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from '@/lib/supabase/categories';

export const categoryForm = yup.object({
  name: yup.string().trim().required(),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g)
    .required(),
});

export const initialValues: CreateCategoryInput = {
  name: '',
  slug: '',
  icon: '',
};
