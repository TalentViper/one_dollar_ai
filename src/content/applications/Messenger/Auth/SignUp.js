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


function SignUp(props) {
   const { registerUser } = useAuth()
   const dispatch = useDispatch();
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
   });

   const handleSubmit = async (values) => {
      registerUser(values).then((res) => {
         if (res) {
            props.switchSignpage()
         }
      })
   };

   return (
      <Box >
         <Typography mb={1} fontWeight={700} fontSize={24} sx={{ color: '#2d333a' }}>Create an Account</Typography>
         <Formik
            initialValues={{ email: '', password: '', first_name: '', last_name : '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ handleChange, handleBlur }) => (
               <Form>
                  <Field
                     size="small"
                     as={TextField}
                     name="first_name"
                     label="First Name"
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
                     label="Last Name"
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
