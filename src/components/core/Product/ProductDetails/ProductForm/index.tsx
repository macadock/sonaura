import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import {
  productContactFormSchema,
  initialValues,
} from './productForm.validator';

interface Props {
  title: string;
  origin: string;
}

const ProductForm: React.FC<Props> = ({ title, origin }) => {
  const { t } = useTranslation('product', { keyPrefix: 'form' });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = () => {
    origin;
  };

  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: productContactFormSchema,
    onSubmit,
  });

  return (
    <Box
      maxWidth={600}
      margin={'0 auto'}
      component={'form'}
      onSubmit={handleSubmit}
      sx={{
        '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
          padding: 0,
        },
        '& .MuiOutlinedInput-input': {
          background: theme.palette.background.paper,
          padding: 2,
        },
      }}
    >
      <Typography variant={'h4'} sx={{ marginY: '2rem' }}>
        {title}
      </Typography>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            {t('input.name')}
          </Typography>
          <TextField
            placeholder={t('placeholder.name')}
            variant="outlined"
            size="medium"
            name="fullName"
            fullWidth
            type="text"
            value={values.fullName}
            onChange={handleChange}
            error={touched.fullName && Boolean(errors.fullName)}
            helperText={touched.fullName && errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            {t('input.email')}
          </Typography>
          <TextField
            placeholder={t('placeholder.email')}
            variant="outlined"
            size="medium"
            name="email"
            fullWidth
            type="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            {t('input.phone')}
          </Typography>
          <TextField
            placeholder={t('placeholder.phone')}
            variant="outlined"
            size="medium"
            name="phone"
            fullWidth
            type="tel"
            value={values.phone}
            onChange={handleChange}
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={700}
            gutterBottom
          >
            {t('input.message')}
          </Typography>
          <TextField
            placeholder={t('placeholder.message')}
            variant="outlined"
            name="message"
            fullWidth
            multiline
            rows={4}
            value={values.message}
            onChange={handleChange}
            error={touched.message && Boolean(errors.message)}
            helperText={touched.message && errors.message}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox />} label={t('gdpr')} />
        </Grid>
        <Grid item container justifyContent="center" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            {t('send')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
