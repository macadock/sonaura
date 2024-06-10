import * as yup from 'yup';
import { CreateInstallationInput } from '@/lib/supabase/installations';

export const installationForm = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  images: yup.object().required(),
});

export const initialValues: CreateInstallationInput = {
  title: '',
  description: '',
};
