import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { Day } from 'lib/supabase/shops';

interface Props {
  hours: Day;
  onMorningUpdate?: (time: TimeUpdate) => void;
  onAfternoonUpdate?: (time: TimeUpdate) => void;
}

export type TimeUpdate = {
  start: Date;
  finish: Date;
};

const TimeTableLine: React.FC<Props> = ({ hours }) => {
  const [closed, setClosed] = useState<boolean>(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControlLabel
        control={
          <Switch
            checked={closed}
            onChange={(e) => {
              setClosed(e.target['checked']);
            }}
          />
        }
        label="Fermé"
      />
      {closed ? null : (
        <>
          <TimePicker
            label="Matin Ouverture"
            format={'HH:mm'}
            views={['hours', 'minutes']}
            value={hours.morning.open}
          />
          <TimePicker
            label="Matin Fermeture"
            format={'HH:mm'}
            views={['hours', 'minutes']}
            value={hours.morning.close}
          />
          <TimePicker
            label="Après-midi Ouverture"
            format={'HH:mm'}
            views={['hours', 'minutes']}
            value={hours.afternoon.open}
          />
          <TimePicker
            label="Après-midi Fermeture"
            format={'HH:mm'}
            views={['hours', 'minutes']}
            value={hours.afternoon.close}
          />
        </>
      )}
    </LocalizationProvider>
  );
};

export default TimeTableLine;
