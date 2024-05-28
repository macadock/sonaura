import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import Price from '@/utils/Price';

interface Props {
  cartTotal: number;
}

const SummaryBox: React.FC<Props> = ({ cartTotal }) => {
  const { t } = useTranslation('checkout');

  const vat = cartTotal * 0.2;

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} marginBottom={4}>
        {t('summary')}
      </Typography>
      <Box
        component={'form'}
        noValidate
        autoComplete="off"
        sx={{
          marginY: 4,
          '& .MuiInputBase-input.MuiOutlinedInput-input': {
            bgcolor: 'background.paper',
          },
        }}
      ></Box>
      <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>{t('subtotal')}</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            <Price price={cartTotal} />
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>{t('vat')}</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            <Price price={vat} />
          </Typography>
        </Box>
        <Divider />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant={'h6'} fontWeight={700}>
            {t('total')}
          </Typography>
          <Typography variant={'h6'} fontWeight={700}>
            <Price price={cartTotal} />
          </Typography>
        </Box>
        <Button
          href={'/panier/commander'}
          variant={'contained'}
          size={'large'}
          fullWidth
        >
          {t('checkout')}
        </Button>
      </Stack>
    </Box>
  );
};

export default SummaryBox;
