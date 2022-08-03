import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

interface Props {
  uniqueName: string;
}

const FormikSessionStorage: React.FC<Props> = ({ uniqueName }) => {
  const { values, setValues } = useFormikContext();
  const [savedValues, setSavedValues] = useState();

  useEffect(() => {
    if (sessionStorage) {
      const a = sessionStorage.getItem(uniqueName);
      setSavedValues(JSON.parse(a));
    }
  }, []);

  useEffect(() => {
    if (savedValues) {
      setValues(savedValues);
    }
  }, [savedValues]);

  useEffect(() => {
    if (values) {
      sessionStorage.setItem(uniqueName, JSON.stringify(values));
    }
  }, [values]);

  return <div />;
};

export default FormikSessionStorage;
