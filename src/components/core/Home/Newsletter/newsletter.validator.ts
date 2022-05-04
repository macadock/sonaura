import { IsEmail, IsNotEmpty } from 'class-validator';

export default class NewsletterValidator {
  @IsNotEmpty()
  @IsEmail()
    email: string;
}
