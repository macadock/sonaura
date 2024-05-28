import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  getInstallationById,
  Installation,
  removeInstallation,
  updateInstallation,
  UpdateInstallationInput,
} from '@/lib/supabase/installations';
import InstallationForm, {
  InsertOrUpdateInstallation,
} from '@/components/dashboard/Installations/InstallationForm';

const DashboardEditInstallationView: React.FC = () => {
  const router = useRouter();
  const installationId = `${router.query['id']}`;
  const { t } = useTranslation('dashboard');

  const [installation, setInstallation] = useState<Installation | null>(null);

  const fetchInstallation = useCallback(async () => {
    const { data } = await getInstallationById(installationId);
    if (data) {
      setInstallation(data);
    }
  }, [installationId]);

  useEffect(() => {
    fetchInstallation();
  }, [fetchInstallation]);

  const update = async (installation: UpdateInstallationInput) => {
    const { error } = await updateInstallation(installation);
    if (error) {
      console.log(error);
      toast.error(t('installations.add.error'));
      return;
    }
    toast.success(t('installations.add.success'));
    router.push('/dashboard/installations');
  };

  const remove = async () => {
    const { error } = await removeInstallation(installationId);
    if (error) {
      console.log(error);
      toast.error(t('installations.remove.error'));
      return;
    }
    toast.success(t('installations.remove.success'));
    router.push('/dashboard/installations');
  };

  const onSubmit = (values: InsertOrUpdateInstallation) => {
    const { id, title, description, images } = values;

    const input = {
      id,
      title,
      description,
      images,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={installationId === null}
      onClick={remove}
      endIcon={<Delete />}
      color="error"
    >
      {t('installations.remove.cta')}
    </Button>
  );

  return (
    <Box>
      <Button
        sx={{ marginBottom: '1rem' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/installations');
        }}
      >
        {t('back')}
      </Button>
      {installation ? (
        <InstallationForm
          formMode={'edit'}
          initialValues={installation}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};

export default DashboardEditInstallationView;
