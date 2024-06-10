import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { initialValues } from '@/components/dashboard/Categories/CategoryForm/category.validator';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
  createInstallation,
  CreateInstallationInput,
} from '@/lib/supabase/installations';
import InstallationForm from '@/components/dashboard/Installations/InstallationForm';

const DashboardNewInstallationView = () => {
  const router = useRouter();

  const { t } = useTranslation('dashboard');

  const create = async (installation: CreateInstallationInput) => {
    const { error } = await createInstallation(installation);
    if (error) {
      console.log(error);
      toast.error(t('installations.add.error'));
      return;
    }
    toast.success(t('installations.add.success'));
    router.push('/dashboard/installations');
  };

  const onSubmit = (values: CreateInstallationInput) => {
    const { title, description, images } = values;

    const input = {
      title,
      description,
      images,
    };

    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/installations');
        }}
      >
        {t('back')}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {t('installations.add.title')}
      </Typography>
      <InstallationForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewInstallationView;
