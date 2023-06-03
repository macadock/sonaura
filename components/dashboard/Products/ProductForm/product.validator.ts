import { InsertOrUpdateProduct } from 'components/dashboard/Products/ProductForm';
import * as yup from 'yup';

export const productFrom = yup.object({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
  fromPrice: yup.number().nullable(),
  price: yup.number().nullable(),
  quantity: yup.number().nullable(),
  slug: yup
    .string()
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g)
    .required(),
  categoryId: yup.string().trim().required(),
  shopId: yup.string().trim().nullable(),
  mainImage: yup.object().optional(),
});

export const initialValues: InsertOrUpdateProduct = {
  name: '',
  description: '',
  slug: '',
  categoryId: '',
  shopId: '',
  quantity: 1,
};
