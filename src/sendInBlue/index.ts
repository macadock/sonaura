export const url = 'https://api.sendinblue.com/v3/';
const apiKey = process.env.NEXT_PUBLIC_SIB_API_KEY;
// Newsletter subscription
export const newsletterListId = 3;
export const newsletterTemplateId = 2;

// Contact Form
export const addContactListId = 4;
export const contactFormCustomerTemplateId = 3;
export const contactFormMerchantTemplateId = 4;

const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
const merchantName = process.env.NEXT_PUBLIC_MERCHANT_NAME;
const merchantEmail = process.env.NEXT_PUBLIC_MERCHANT_EMAIL;

const getFirstNameAndLastName = (
  fullName: string,
): { FNAME: string; LNAME: string } | string => {
  if (fullName) {
    const nameArray = fullName.split(' ');
    return {
      FNAME: nameArray[0] || '',
      LNAME: nameArray[1] || '',
    };
  }

  return '';
};

export default class SendInBlue {
  static getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('api-key', apiKey);
    return headers;
  }

  static getBodyNewsletterSubscription(email: string): string {
    const body = {
      email,
      includeListIds: [newsletterListId],
      redirectionUrl: websiteUrl,
      templateId: newsletterTemplateId,
    };
    return JSON.stringify(body);
  }

  static getBodyAddContactToList(email: string, name?: string): string {
    const body = {
      email,
      attributes: getFirstNameAndLastName(name),
      includeListIds: [addContactListId],
      updateEnabled: true,
    };
    return JSON.stringify(body);
  }

  static getBodyEmailToCustomer(
    templateId: number,
    email: string,
    fullName: string,
    params?: { [key: string]: string },
  ): string {
    const body = {
      to: [{ email, name: fullName || '' }],
      replyTo: {
        email: merchantEmail,
        name: merchantName,
      },
      templateId,
      params: {
        websiteUrl,
        email,
        fullName,
        ...params,
      },
    };
    return JSON.stringify(body);
  }

  static getBodyEmailToMerchant(
    templateId: number,
    customerEmail: string,
    customerFullName: string,
    params?: { [key: string]: string },
  ): string {
    const body = {
      to: [{ email: merchantEmail, name: merchantName }],
      replyTo: {
        email: customerEmail,
        name: customerFullName || '',
      },
      templateId,
      params: {
        customerEmail,
        customerFullName,
        ...params,
      },
    };
    return JSON.stringify(body);
  }
}
