import { InsertOrUpdateProduct } from 'components/dashboard/Products/ProductForm';
import * as yup from 'yup';

export const productFrom = yup.object({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
  fromPrice: yup.number(),
  price: yup.number(),
  quantity: yup.number(),
  slug: yup.string().trim().required(),
  categoryId: yup.string().trim().required(),
  shopId: yup.string().trim(),
});

export const initialValues: InsertOrUpdateProduct = {
  name: '',
  description: '',
  fromPrice: 0,
  price: 0,
  quantity: 0,
  slug: '',
  categoryId: '',
  shopId: '',
};
