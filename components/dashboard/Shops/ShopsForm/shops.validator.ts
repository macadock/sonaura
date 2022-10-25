import * as yup from 'yup';
import { JsonValue } from 'type-fest';

export const shopForm = yup.object({
  address: yup.string().trim().required(),
  postalCode: yup.string().trim().required(),
  city: yup.string().trim().required(),
  country: yup.string().trim().required(),
  phoneNumber: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  openHours: yup.object().required(),
  image: yup.string().url().required(),
  googleMapsUrl: yup.string().url().required(),
});

export const initialValues: shopFormTypes = {
  address: '',
  postalCode: '',
  city: '',
  country: '',
  phoneNumber: '',
  email: '',
  openHours: '',
  image: '',
  googleMapsUrl: '',
};

export interface shopFormTypes {
  address: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  email: string;
  openHours: JsonValue;
  image: string;
  googleMapsUrl: string;
}
