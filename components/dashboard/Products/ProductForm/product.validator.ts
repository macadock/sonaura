import * as yup from 'yup';

export const productFrom = yup.object({
  name: yup.string().trim().required(),
  description: yup.string().trim().required(),
  fromPrice: yup.number(),
  mainAsset: yup.string().trim().required(),
  price: yup.number(),
  quantity: yup.number(),
  slug: yup.string().trim().required(),
  categoryId: yup.string().trim().required(),
  shopId: yup.string().trim(),
});

export const initialValues: productFormTypes = {
  name: '',
  description: '',
  fromPrice: 0,
  mainAsset: '',
  price: 0,
  quantity: 0,
  slug: '',
  categoryId: '',
  shopId: '',
};

export interface productFormTypes {
  name: string;
  description: string;
  fromPrice: number;
  mainAsset: string;
  price: number;
  quantity: number;
  slug: string;
  categoryId: string;
  shopId: string;
}
