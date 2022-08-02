import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const getInstance = (phoneNumber: string) => {
  const instance = PhoneNumberUtil.getInstance();
  return {
    instance,
    number: instance.parse(phoneNumber, 'FR'),
  };
};

/**
 * Format a phone number into ISO E164 spec
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const { instance, number } = getInstance(phoneNumber);

  return instance.format(number, PhoneNumberFormat.E164);
};
