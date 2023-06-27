import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import { useTranslation } from 'next-i18next';

interface Props {
  name: string;
}

const TextField: React.FC<Props & TextFieldProps> = ({ name, ...props }) => {
  const { t } = useTranslation('dashboard');
  return (
    <Field name={name}>
      {({
        field: { name, onBlur, onChange, value },
        meta: { error, touched },
      }: FieldProps) => (
        <MuiTextField
          name={name}
          label={t(name)}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={touched && Boolean(error)}
          helperText={touched && error ? '' : null}
          fullWidth
          {...props}
        />
      )}
    </Field>
  );
};

export default TextField;
