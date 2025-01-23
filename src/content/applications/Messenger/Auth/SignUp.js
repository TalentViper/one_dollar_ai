import { useState } from 'react';
import {
   Box,
   Button,
   TextField,
   Typography,
} from '@mui/material';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { useAuth } from "src/contexts/AuthContext";
import { useTranslation } from 'react-i18next';
import { useInviteInteraction } from "src/contexts/InviteContext";

function SignUp(props) {
   const { inviteCode, mustSignedInvitedUser } = useInviteInteraction();
   const { registerUser } = useAuth()
   
   const { t } = useTranslation();
   // Validation schema using Yup
   const validationSchema = Yup.object().shape({
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
      email: Yup.string()
         .email('Invalid email address')
         .required('Email is required'),
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
      confirm_password: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensure it matches newPassword
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
   });

   const handleSubmit = async (values) => {
      if (inviteCode && mustSignedInvitedUser) {
         values.invite_code = inviteCode
      }
      registerUser(values).then((res) => {
         if (res) {
            props.switchSignpage()
         }
      })
   };

   return (
      <Box >
         <Typography mb={1} fontWeight={700} fontSize={24} sx={{ color: '#2d333a' }}>{t('createAnAccount')}</Typography>
         <Formik
            initialValues={{ email: '', password: '', first_name: '', last_name: '', confirm_password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ handleChange, handleBlur }) => (
               <Form>
                  <Field
                     size="small"
                     as={TextField}
                     name="first_name"
                     label={t("firstName")}
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="first_name" />)}
                     helperText={<ErrorMessage name="first_name" />}
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
                     name="last_name"
                     label={t('lastName')}
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="last_name" />)}
                     helperText={<ErrorMessage name="last_name" />}
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
                     label={t('password')}
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
                  <Field
                     size="small"
                     as={TextField}
                     name="confirm_password"
                     label={t("confirmPassword")}
                     type="password"
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="confirm_password" />)}
                     helperText={<ErrorMessage name="confirm_password" />}
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
                     {t('signUp')}
                  </Button>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default SignUp;
