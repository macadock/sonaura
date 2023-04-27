import { MenuItem, Select, SelectProps } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface Props<T> {
  name: string;
  datas: T[];
  menuId?: string;
  menuName?: string;
}

export function SelectField<T extends Props<T> & SelectProps>({
  name,
  datas,
  menuId = 'id',
  menuName = 'name',
  ...props
}) {
  return (
    <Field name={name}>
      {({
        field: { name, onBlur, onChange, value },
        meta: { error, touched },
      }: FieldProps) => (
        <Select
          fullWidth
          name={name}
          value={value || ''}
          onBlur={onBlur}
          onChange={onChange}
          error={touched && Boolean(error)}
          {...props}
        >
          {datas
            ? datas.map((data) => (
                <MenuItem key={data[menuId]} value={data[menuId]}>
                  {data[menuName]}
                </MenuItem>
              ))
            : false}
        </Select>
      )}
    </Field>
  );
}

export default SelectField;
