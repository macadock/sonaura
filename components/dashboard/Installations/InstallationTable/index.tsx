import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from 'components/system/LoadingScreen';
import { getInstallations, Installation } from 'lib/supabase/installations';

const InstallationTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  const fetchInstallations = async () => {
    const { data } = await getInstallations();
    if (data) {
      setInstallations(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstallations();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: t('date'),
      renderCell: ({ value }) =>
        new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'short',
        }).format(new Date(value)),
      flex: 10,
    },
    { field: 'title', headerName: t('title'), flex: 50 },
    { field: 'description', headerName: t('description'), flex: 50 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={installations}
      pageSize={10}
      onRowClick={({ id }) => {
        router.push(`/dashboard/installations/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default InstallationTable;
