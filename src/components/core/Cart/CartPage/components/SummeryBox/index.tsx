import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import Price from '../../../../../../utils/Price';

interface Props {
  cartTotal: number;
  isEmpty: boolean;
}

const SummeryBox: React.FC<Props> = ({ cartTotal, isEmpty }) => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const vat = cartTotal * 0.2;

  return (
    <Box>
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
            <Price formatedPrice={cartTotal} />
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography color={'text.secondary'}>{t('vat')}</Typography>
          <Typography color={'text.secondary'} fontWeight={700}>
            <Price formatedPrice={vat} />
          </Typography>
        </Box>
        <Divider />
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant={'h6'} fontWeight={700}>
            {t('total')}
          </Typography>
          <Typography variant={'h6'} fontWeight={700}>
            <Price formatedPrice={cartTotal} />
          </Typography>
        </Box>
        <Button
          disabled={isEmpty}
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

export default SummeryBox;