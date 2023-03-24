import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { Product } from 'gql/__generated__/product';

type ShopHours = {
  hours: { [key: number]: Hour[] }[];
};

type Hour = {
  Start: string;
  Finish: string;
};

interface Props {
  shops: Product['product']['shops'];
}

const Shops: React.FC<Props> = ({ shops }) => {
  const theme = useTheme();
  const { t } = useTranslation('product');

  const shop = shops[0];
  const { hours }: ShopHours = shop.openHours;
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
      >{`Bang & Olufsen ${shop.name}`}</Typography>
      {hours.map((hour) => {
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
      })}
    </Box>
  );
};

export default Shops;
