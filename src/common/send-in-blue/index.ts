import {
  getRoutePath,
  PagesUrls,
  sendInBlueKey,
  merchantEmail,
  merchantName,
  sendInBlueUrl,
} from 'appConstants';
import { formatPhoneNumber } from 'utils/phone-number';
import AddToListInput from './dto/add-to-list.input';
import NewsletterSubscriptionInput from './dto/newsletter-subscription.input';
import SendCustomerEmailInput from './dto/send-customer-email.input';
import SendMerchantEmailInput from './dto/send-merchant-email.input';

export default class SendInBlue {
  private static getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('api-key', sendInBlueKey);
    return headers;
  }

  public static subscribeToNewsletter(
    newsletterSubscriptionInput: NewsletterSubscriptionInput,
  ): Promise<Response> {
    const url = `${sendInBlueUrl}/contacts/doubleOptinConfirmation`;
    const includeListIds = [3];
    const templateId = 2;

    const { email } = newsletterSubscriptionInput;

    const body = JSON.stringify({
      email,
      includeListIds,
      redirectionUrl: getRoutePath({ page: PagesUrls.HOMEPAGE }),
      templateId,
    });

    return fetch(url, {
      method: 'POST',
      body,
      headers: this.getHeaders(),
    });
  }

  public static addToList(addToListInput: AddToListInput): Promise<Response> {
    const url = `${sendInBlueUrl}/contacts`;

    const { firstName, lastName, email, phone, includeListIds } =
      addToListInput;

    const body = JSON.stringify({
      email,
      attributes: {
        PRENOM: firstName,
        NOM: lastName,
        SMS: formatPhoneNumber(phone),
      },
      includeListIds,
      updateEnabled: true,
    });

    return fetch(url, {
      method: 'POST',
      body,
      headers: this.getHeaders(),
    });
  }

  public static sendMerchantEmail(sendEmailInput: SendMerchantEmailInput) {
    const url = `${sendInBlueUrl}/smtp/email`;

    const { email, message, templateId, firstName, lastName, params } =
      sendEmailInput;

    const fullName = `${firstName} ${lastName}`;

    const body = JSON.stringify({
      to: [{ email: merchantEmail, name: merchantName }],
      replyTo: {
        email,
        name: fullName,
      },
      templateId: templateId,
      params: {
        customerEmail: email,
        customerFullName: fullName,
        message,
        ...params,
      },
    });

    return fetch(url, {
      method: 'POST',
      body,
      headers: this.getHeaders(),
    });
  }

  public static async sendCustomerEmail(
    sendEmailInput: SendCustomerEmailInput,
  ): Promise<Response> {
    const url = `${sendInBlueUrl}/smtp/email`;

    const {
      email,
      message,
      phone,
      templateId,
      includeListIds,
      firstName,
      lastName,
      params,
    } = sendEmailInput;

    const fullName = `${firstName} ${lastName}`;

    const body = JSON.stringify({
      to: [{ email, name: fullName }],
      replyTo: {
        email: merchantEmail,
        name: merchantName,
      },
      templateId: templateId.customer,
      params: {
        websiteUrl: getRoutePath({ page: PagesUrls.HOMEPAGE }),
        email,
        fullName,
        message,
        ...params,
      },
    });

    try {
      await this.sendMerchantEmail({
        email,
        firstName,
        lastName,
        message,
        params,
        templateId: templateId.merchant,
      });
    } catch (e) {
      throw new Error(`Error while send email to merchant from ${email}`);
    }

    try {
      if (includeListIds) {
        await this.addToList({
          email,
          firstName,
          lastName,
          phone,
          includeListIds,
        });
      }
    } catch (e) {
      throw new Error(
        `Error while adding email ${email} to listId ${includeListIds.toString()} `,
      );
    }

    return fetch(url, {
      method: 'POST',
      body,
      headers: this.getHeaders(),
    });
  }
}
