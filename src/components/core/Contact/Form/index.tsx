/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendInBlue, {
  contactFormCustomerTemplateId,
  contactFormMerchantTemplateId,
  url,
} from '../../../../sendInBlue';
import toast from 'react-hot-toast';

const validationSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(2, "Merci d'enter votre nom complet")
    .max(50, "Merci d'enter votre nom complet")
    .required("Merci d'enter votre nom complet"),
  message: yup.string().trim().required("Merci d'écrire un message"),
  email: yup
    .string()
    .trim()
    .email("Merci d'entrer une adresse email valide")
    .required("L'email est requis"),
});

const Form: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const {
    getHeaders,
    getBodyAddContactToList,
    getBodyEmailToCustomer: getBodyContactFormForCustomerEmail,
    getBodyEmailToMerchant: getBodyContactFormForMerchantEmail,
  } = SendInBlue;

  const initialValues = {
    fullName: '',
    message: '',
    email: '',
  };

  const onSubmit = async ({ fullName, message, email }) => {
    const addcontactToList = fetch(`${url}contacts`, {
      method: 'POST',
      headers: getHeaders(),
      body: getBodyAddContactToList(email, fullName),
    });

    const sendFormByEmailToCustomer = fetch(`${url}smtp/email`, {
      method: 'POST',
      headers: SendInBlue.getHeaders(),
      body: getBodyContactFormForCustomerEmail(
        contactFormCustomerTemplateId,
        email,
        fullName,
        { message },
      ),
    });

    const sendFormByEmailToMerchant = fetch(`${url}smtp/email`, {
      method: 'POST',
      headers: SendInBlue.getHeaders(),
      body: getBodyContactFormForMerchantEmail(
        contactFormMerchantTemplateId,
        email,
        fullName,
        { message },
      ),
    });

    const sendForm = Promise.all([
      addcontactToList,
      sendFormByEmailToCustomer,
      sendFormByEmailToMerchant,
    ]);

    toast.promise(sendForm, {
      loading: 'Envoi en cours...',
      success: () => {
        resetForm();
        return 'Message envoyé';
      },
      error: 'Erreur. Merci de réessayer.',
    });
  };

  const { handleSubmit, values, handleChange, touched, errors, resetForm } =
    useFormik({
      initialValues,
      validationSchema: validationSchema,
      onSubmit,
    });

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography
          variant={'h4'}
          sx={{ fontWeight: 700, paddingBottom: '1rem' }}
          gutterBottom
          align={'center'}
        >
          Vous ne trouvez pas de réponse à vos questions ?
        </Typography>
      </Box>
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
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight={700}
              gutterBottom
            >
              Nom complet
            </Typography>
            <TextField
              placeholder="Prénom et Nom"
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
              E-mail
            </Typography>
            <TextField
              placeholder="Adresse e-mail"
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
              Message
            </Typography>
            <TextField
              placeholder="Votre question à propos de nos services"
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
          <Grid item container justifyContent="center" xs={12}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
            >
              Envoyer
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Form;
