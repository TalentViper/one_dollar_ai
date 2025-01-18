import { useCallback, forwardRef, useState } from 'react';
import {
   Avatar,
   Link,
   Box,
   Button,
   Divider,
   IconButton,
   InputAdornment,
   lighten,
   List,
   ListItem,
   ListItemAvatar,
   TextField,
   Tooltip,
   Typography,
   Dialog,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Slide,
   Fade,
   Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


import { useDispatch } from 'react-redux';

import { userSignUp } from 'src/actions/authAction';


function SignUp() {

   const dispatch = useDispatch();
   // Validation schema using Yup
   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
         .email('Invalid email address')
         .required('Email is required'),
      password: Yup.string()
         .min(6, 'Password must be at least 6 characters')
         .required('Password is required'),
   });

   const handleSubmit = async (values) => {
      console.log('Form submitted successfully:', values);
      dispatch(userSignUp(values));
   };

   return (
      <Box >
         <Typography mb={1} fontWeight={700} fontSize={24} sx={{ color: '#2d333a' }}>Create an Account</Typography>
         <Formik
            initialValues={{ email: '', password: '', firstName: '', lastName : '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ handleChange, handleBlur }) => (
               <Form>
                  <Field
                     size="small"
                     as={TextField}
                     name="firstName"
                     label="First Name"
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="firstName" />)}
                     helperText={<ErrorMessage name="firstName" />}
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
                     name="lastName"
                     label="Last Name"
                     fullWidth
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={Boolean(<ErrorMessage name="lastName" />)}
                     helperText={<ErrorMessage name="lastName" />}
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
                     label="Email address"
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
                     label="Password"
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
                     Continue
                  </Button>
               </Form>
            )}
         </Formik>
      </Box>
   );
}

export default SignUp;
