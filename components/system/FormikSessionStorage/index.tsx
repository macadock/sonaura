import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
  uniqueName: string;
}

const FormikSessionStorage = ({ uniqueName }: Props) => {
  const { values, setValues } = useFormikContext();
  const [savedValues, setSavedValues] = useState();

  useEffect(() => {
    if (sessionStorage) {
      const a = sessionStorage.getItem(uniqueName);
      setSavedValues(JSON.parse(a));
    }
  }, [uniqueName]);

  useEffect(() => {
    if (savedValues) {
      setValues(savedValues);
    }
  }, [savedValues, setValues]);

  useEffect(() => {
    if (values) {
      sessionStorage.setItem(uniqueName, JSON.stringify(values));
    }
  }, [uniqueName, values]);

  return <div />;
};

export default FormikSessionStorage;
