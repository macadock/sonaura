import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { VariantImage, Variant } from 'types';

interface Props {
  variant: Variant;
  image: VariantImage;
  handleChange: (
    image: VariantImage,
    option: VariantImage['variants'][number],
  ) => Promise<void>;
}
const AttributeDropdown: React.FC<Props> = ({
  variant,
  handleChange,
  image,
}) => {
  const { t } = useTranslation('dashboard');
  const { name, values } = variant;
  const defaultValue =
    image.variants?.find((option) => option.name === name)?.value || '';
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  return (
    <FormControl fullWidth>
      <Select
        fullWidth
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          handleChange(image, { name, value: e.target.value });
        }}
      >
        <MenuItem disabled key="">
          {t(`attributes.${name}`)}
        </MenuItem>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default AttributeDropdown;
