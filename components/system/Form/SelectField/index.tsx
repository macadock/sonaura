import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectProps } from '@mui/material/Select';
import { Field, FieldProps } from 'formik';
import { useTranslation } from 'next-i18next';

type Props<T = any> = {
  name: string;
  datas: T[];
  menuId?: string;
  menuName?: string;
} & SelectProps;

export function SelectField({
  name = '',
  datas,
  menuId = 'id',
  menuName = 'name',
  ...props
}: Props) {
  const { t } = useTranslation('dashboard');
  return (
    <Field name={name}>
      {({
        field: { name, onBlur, onChange, value },
        meta: { error, touched },
      }: FieldProps) => (
        <FormControl fullWidth>
          <InputLabel>{t(`select.${name}`)}</InputLabel>
          <Select
            fullWidth
            name={name}
            label={t(`select.${name}`)}
            value={value || ''}
            onBlur={onBlur}
            onChange={onChange}
            error={touched && Boolean(error)}
            {...props}
          >
            <MenuItem disabled key="">
              {t(`select.${name}`)}
            </MenuItem>
            {datas
              ? datas.map((data) => (
                  <MenuItem key={data[menuId]} value={data[menuId]}>
                    {data[menuName]}
                  </MenuItem>
                ))
              : false}
          </Select>
        </FormControl>
      )}
    </Field>
  );
}

export default SelectField;
