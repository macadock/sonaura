import { Shop, ShopHours } from 'lib/supabase/shops';
import TimeTableLine from 'components/dashboard/Shops/ShopTimeTable/TimeTableLine';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

type OpenHours = Shop['openHours'];

interface Props {
  openHours: ShopHours;
  onUpdate: (openHours: OpenHours) => void;
}

const ShopTimeTable: React.FC<Props> = ({ openHours = {} }) => {
  const daysTranslation = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };

  const days = Object.keys(daysTranslation);

  // const onCloseUpdate = (day: number) => {};

  // const onMorningUpdate = (newTime: TimeUpdate) => {};

  // const onAfternoonUpdate = (newTime: TimeUpdate) => {};

  return (
    <Grid
      container
      spacing={4}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      {openHours
        ? days.map((day) => {
            return (
              <Grid item key={day}>
                <Stack direction={'row'} spacing={4}>
                  <Typography fontWeight={'bold'}>
                    {daysTranslation[day]}
                  </Typography>
                  <TimeTableLine hours={openHours[day]} />
                </Stack>
              </Grid>
            );
          })
        : null}
    </Grid>
  );
};

export default ShopTimeTable;
