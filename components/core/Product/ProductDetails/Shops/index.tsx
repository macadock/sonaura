import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Shop, ShopHours } from '@/lib/supabase/shops';
import { useTranslation } from 'next-i18next';

interface Props {
  shop: Shop;
}

const Shops: React.FC<Props> = ({ shop }) => {
  const theme = useTheme();
  const { t } = useTranslation('product');

  // const hours = shop.openHours['hours'] as ShopHours['hours'];
  const todayDate = new Date();

  return (
    <Box
      padding={2}
      sx={{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.grey[300],
        borderRadius: '5px',
      }}
    >
      <Typography
        sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
      >{`Bang & Olufsen ${shop.city}`}</Typography>
      {/* {hours.map((hour) => {
        const day = parseInt(Object.keys(hour)[0]);
        const today = day === todayDate.getDay();
        const values = Object.values(hour)[0];

        return (
          <Box
            key={day}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography
              sx={{ fontWeight: `${today ? 'bold' : 'none'}` }}
              variant="body2"
              color={theme.palette.text.primary}
            >
              {`${t(`days.${day}`)} : `}
            </Typography>
            <Typography
              sx={{ fontWeight: `${today ? 'bold' : 'none'}` }}
              variant="body2"
              color={theme.palette.text.primary}
            >
              {values.length === 0
                ? t('closed')
                : values.map(({ Start, Finish }, index) => {
                    const startHour = `${Start.substring(
                      0,
                      2,
                    )}:${Start.substring(2)}`;
                    const endHour = `${Finish.substring(
                      0,
                      2,
                    )}:${Finish.substring(2)}`;
                    const addComma = index + 1 < values.length;
                    return `${startHour} - ${endHour}${addComma ? ', ' : ''}`;
                  })}
            </Typography>
          </Box>
        );
      })} */}
    </Box>
  );
};

export default Shops;
