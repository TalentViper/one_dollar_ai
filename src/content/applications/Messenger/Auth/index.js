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
  Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import AppleLogin from 'react-apple-login';
import MicrosoftLogin from "react-microsoft-login";


import { useDispatch } from 'react-redux';

import { userSignIn, userSignUp } from 'src/actions/authAction';

const REDIRECT_URI = window.location.href;

function Auth() {

  const dispatch = useDispatch();


  const [open, setOpen] = useState(false);

  const [isSignIn, setisSignIn] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setisSignIn(true);
    }, 500);
  }

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    console.log('Form submitted successfully:', values);
    if(!isSignIn){
      const res = await dispatch(userSignUp(values));
      if (res) {
        setOpen(false);
      }
    }
  };

  const authHandler = (err, data) => {
    console.log(err, data);
  };

  const handleLoginSuccess = (response) => {
    console.log("Login successful:", response);
    // You can use response.credential to get the Google access token and further process
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };

  const formChange = (value) => {
    setisSignIn(value);
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          background: '#265A9E',
          color: 'white',
        }}
        fullWidth
        variant="contained" color='primary' size='medium'>
        Sign In
      </Button>

      <Dialog
        maxWidth='xs'
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={open}>
        <DialogContent
          sx={{
            background: 'white',
            padding: 5
          }}>
          <Box display="flex" justifyContent='center' mb={2}>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#265A9E' }}>
              OneDollar
            </Typography>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#227ff3' }}>
              AI
            </Typography>
          </Box>
          <Box display='flex' justifyContent='center' mb={1} >
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#2d333a' }}>{isSignIn ? 'Sign In' : 'Create an Account'}</Typography>
          </Box>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <Field
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
                    mb:1.5,
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
                    mb:1.5,
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
          {isSignIn ? (
            <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2">
                Don't have an account?
                &nbsp;
              </Typography>
              <Button
                sx={{ color: '#10a37f' }}
                color="primary" size="small"
                onClick={() => formChange(!isSignIn)}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body2">
                Already have an account?
                &nbsp;
              </Typography>
              <Button
                sx={{ color: '#10a37f' }}
                color="primary" size="small"
                onClick={() => formChange(!isSignIn)}
              >
                Login
              </Button>
            </Box>
          )}
          <Divider sx={{ borderColor: 'red !important', mb: 2 }}>OR</Divider>
          <GoogleOAuthProvider clientId="230145804836-u5436jfr11ne7mrocuaer7iq4jaigmab.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              buttonText="Continue with Google"
            />
          </GoogleOAuthProvider>
        </DialogContent>
      </Dialog>

    </>
  );
}

export default Auth;
