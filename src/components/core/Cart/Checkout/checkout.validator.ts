import * as yup from 'yup';

export type Country = {
  code: string;
  label: string;
};

export const checkoutForm = yup.object({
  fullName: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  phoneNumber: yup.string().trim().min(10).required(),
  address: yup.string().trim().required(),
  country: yup.object().nullable().required(),
  city: yup.string().trim().required(),
  postalCode: yup
    .string()
    .required()
    .matches(/^[0-9]+$/)
    .length(5),
  hasBillingAddress: yup.boolean().required(),
  billingAddress: yup.string().when('hasBillingAddress', {
    is: (hasBillingAddress) => hasBillingAddress === true,
    then: yup.string().trim().required(),
  }),
  billingCountry: yup
    .object()
    .nullable()
    .when('hasBillingAddress', {
      is: (hasBillingAddress) => hasBillingAddress === true,
      then: yup.object().nullable().required(),
    }),
  billingCity: yup.string().when('hasBillingAddress', {
    is: (hasBillingAddress) => hasBillingAddress === true,
    then: yup.string().trim().required(),
  }),
  billingPostalCode: yup.string().when('hasBillingAddress', {
    is: (hasBillingAddress) => hasBillingAddress === true,
    then: yup
      .string()
      .required()
      .matches(/^[0-9]+$/)
      .length(5),
  }),
});

export const initialValues: checkoutFormTypes = {
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  country: null,
  city: '',
  postalCode: '',
  hasBillingAddress: false,
  billingAddress: '',
  billingCountry: null,
  billingCity: '',
  billingPostalCode: '',
};

export interface checkoutFormTypes {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: Country;
  city: string;
  postalCode: string;
  hasBillingAddress: boolean;
  billingAddress: string;
  billingCountry: Country;
  billingCity: string;
  billingPostalCode: string;
}
