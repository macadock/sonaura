import { InsertOrUpdateProduct } from 'components/dashboard/Products/ProductForm';
import * as yup from 'yup';

export const productFrom = yup.object({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
  fromPrice: yup.string().nullable(),
  price: yup.string().nullable(),
  quantity: yup.string().nullable(),
  slug: yup.string().trim().required(),
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
};
