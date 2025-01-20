import { useState } from 'react';
import {
   Button,
   TextField,
   Typography,
} from '@mui/material';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'src/contexts/AuthContext';


function SignIn(props) {

   const { loginUser } = useAuth();

   const { t, i18n } = useTranslation();

   const validationSchema = Yup.object().shape({
      email: Yup.string()
         .email('Invalid email address')
         .required('Email is required'),
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
   });

   const handleSubmit = async (values) => {
      loginUser(values.email, values.password).then(res => {
         if (res) {
            props.modalClose();
         }
      });
   };

   return (
      < >
         <Typography mb={1} fontWeight={700} fontSize={24} sx={{ color: '#2d333a' }}>{t('signIn')}</Typography>
         <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ handleChange, handleBlur }) => (
               <Form>
                  <Field
                     size="small"
                     as={TextField}
                     name="email"
                     label={t('emailAddress')}
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="email" />)}
                     helperText={<ErrorMessage name="email" />}
                     InputLabelProps={{
                        sx: {
                           color: '#2d333a !important', // Change label color
                        },
                     }}
                     sx={{
                        mb: 1.5,
                        '& .MuiInputLabel-root': {
                           color: 'green !importnat',
                           '& label': {
                              color: 'green !importnat'
                           }
                        },
                        '& .MuiInputBase-input': {
                           color: '#2d333a',
                           '&::placeholder': {
                              color: 'black',
                              opacity: 1,
                           },
                           '&:-webkit-autofill': {
                              WebkitBoxShadow: '0 0 0 100px #fff inset',
                              WebkitTextFillColor: 'gray',
                              caretColor: 'gray',
                              borderRadius: 'inherit',
                           },
                        },
                        '& .MuiOutlinedInput-root': {
                           '& fieldset': {
                              borderColor: 'gray !important',
                           },
                           '&:hover fieldset': {
                              borderColor: 'black',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: '#10a37f',
                           },
                        },
                     }}
                  />
                  <Field
                     size="small"
                     as={TextField}
                     name="password"
                     label={t("password")}
                     type="password"
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="password" />)}
                     helperText={<ErrorMessage name="password" />}
                     InputLabelProps={{
                        sx: {
                           color: '#2d333a !important', // Change label color
                        },
                     }}
                     sx={{
                        mb: 1.5,
                        '& .MuiInputLabel-root': {
                           color: 'green !importnat',
                           '& label': {
                              color: 'green !importnat'
                           }
                        },
                        '& .MuiInputBase-input': {
                           color: '#2d333a',
                           '&::placeholder': {
                              color: 'black',
                              opacity: 1,
                           },
                           '&:-webkit-autofill': {
                              WebkitBoxShadow: '0 0 0 100px #fff inset',
                              WebkitTextFillColor: 'gray',
                              caretColor: 'gray',
                              borderRadius: 'inherit',
                           },
                        },
                        '& .MuiOutlinedInput-root': {
                           '& fieldset': {
                              borderColor: 'gray !important',
                           },
                           '&:hover fieldset': {
                              borderColor: 'black',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: '#10a37f',
                           },
                        },
                     }}
                  />
                  <Button
                     type="submit"
                     variant="contained"
                     sx={{ background: '#10a37f', width: '100%', mb: 2, color: 'white' }}
                  >
                     {t('signIn')}
                  </Button>
               </Form>
            )}
         </Formik>
      </>
   );
}

export default SignIn;
