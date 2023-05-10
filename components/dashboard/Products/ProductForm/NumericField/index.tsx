import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

interface Props {
  name: string;
}

const NumericField: React.FC<Props & TextFieldProps> = ({ name }) => {
  return (
    <Field name={name}>{(props: FieldProps) => <FormField {...props} />}</Field>
  );
};

const FormField: React.FunctionComponent<FieldProps> = (props) => {
  const {
    field: { name, onBlur, value: formikValue },
    meta: { error, touched },
    form: { setFieldValue },
  } = props;

  const { t } = useTranslation('dashboard');

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(formikValue === null ? '' : formikValue);
  }, [formikValue]);

  return (
    <TextField
      name={name}
      label={t(name)}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      onBlur={onBlur}
      value={value}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      error={touched && Boolean(error)}
      helperText={touched && error ? '' : null}
      fullWidth
    />
  );
};

export default NumericField;
