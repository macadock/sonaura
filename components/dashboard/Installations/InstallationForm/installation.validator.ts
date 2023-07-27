import { InsertOrUpdateInstallation } from 'components/dashboard/Installations/InstallationForm';
import * as yup from 'yup';

export const installationForm = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  images: yup.object().required(),
});

export const initialValues: InsertOrUpdateInstallation = {
  title: '',
  description: '',
};
