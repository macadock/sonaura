import * as yup from 'yup';
import { InsertOrUpdateShop } from 'components/dashboard/Shops/ShopsForm';

export const shopForm = yup.object({
  address: yup.string().trim().required(),
  postalCode: yup.string().trim().required(),
  city: yup.string().trim().required(),
  country: yup.string().trim().required(),
  phoneNumber: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  // openHours: yup.object().optional(),
  image: yup.object().optional().nullable(),
  googleMapsUrl: yup.string().url().required(),
});

export const initialValues: InsertOrUpdateShop = {
  address: '',
  postalCode: '',
  city: '',
  country: '',
  phoneNumber: '',
  email: '',
  // openHours: {
  //   hours: [
  //     {
  //       '1': [],
  //     },
  //     {
  //       '2': [],
  //     },
  //     {
  //       '3': [],
  //     },
  //     {
  //       '4': [],
  //     },
  //     {
  //       '5': [],
  //     },
  //     {
  //       '6': [],
  //     },
  //     {
  //       '7': [],
  //     },
  //   ],
  // },
  googleMapsUrl: '',
};
