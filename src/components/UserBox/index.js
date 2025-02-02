import React, { useRef, useCallback, forwardRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ListItem,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import { useAuth } from 'src/contexts/AuthContext';

const UserBoxWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const default_user = {
  name: 'Catherine Pike',
  email: 'random.dude@random.com',
  avatar: '/static/images/avatars/4.jpg'
};
export default function UserBox() {

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = React.useState(1);

  const handleTab = (newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(1);
  }

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match') // Ensure it matches newPassword
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    console.log('Form submitted successfully:', values);
  };

  return (
    <UserBoxWrapper >
      <Button
        fullWidth
        sx={{ pt: 0 }}
        onClick={handleClickOpen}
        startIcon={<Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
          }}
          alt={user?.first_name}
          src={user?.avatar || user?.picture || default_user.avatar}
        />}>
        <div>
          <Typography sx={{ textAlign: 'left', color: 'black' }} fontSize={16} fontWeight={600}>{user?.first_name ? (user?.first_name + " " + user?.last_name) : default_user.name}</Typography>
          <Typography sx={{ textAlign: 'left', color: '#747778' }} fontSize={12} fontWeight={400}>{user?.email || default_user.email}</Typography>
        </div>
      </Button>

      <Dialog
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={isOpen}>
        <DialogContent
          sx={{
            background: 'white',
            padding: 3
          }}>
          <Box mb={2}>
            <Typography fontWeight={700} fontSize={30} sx={{ color: 'black' }}>
              {t('settings')}
            </Typography>
          </Box>
          <Box
            sx={{ flexGrow: 1, color: 'black', display: 'flex', gap: 2, height: 320 }}
          >
            <Box width={180}>
              <Typography fontSize={20} sx={{ display: 'flex', alignItems: 'center' }}><SettingsIcon />&nbsp;{t('gerneral')}</Typography>
              <ListItem component="div" disablePadding sx={{ flexDirection: 'column', display: 'flex' }}>
                <ListItemButton onClick={() => handleTab(1)}>
                  <ListItemText primary={t('changePassword')} />
                </ListItemButton>
                <ListItemButton onClick={() => handleTab(2)}>
                  <ListItemText primary={t('enterInviteCode')} />
                </ListItemButton>
              </ListItem>
            </Box>
            {value == 1 ? (
              <Box width={250}>
              <Typography fontSize={20} fontWeight={700} mb={1}>
                {t('changePassword')}
              </Typography>
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
                      type="password"
                      name="currentPassword"
                      label={t('currentPassword')}
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(<ErrorMessage name="currentPassword" />)}
                      helperText={<ErrorMessage name="currentPassword" />}
                      InputLabelProps={{
                        sx: {
                          color: '#2d333a !important', // Change label color
                        },
                      }}
                      sx={{
                        mb: 1.5,
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
                      type="password"
                      name="newPassword"
                      label={t('newPassword')}
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(<ErrorMessage name="newPassword" />)}
                      helperText={<ErrorMessage name="newPassword" />}
                      InputLabelProps={{
                        sx: {
                          color: '#2d333a !important', // Change label color
                        },
                      }}
                      sx={{
                        mb: 1.5,
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
                      type="password"
                      name="confirmPassword"
                      label={t('confirmPassword')}
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(<ErrorMessage name="confirmPassword" />)}
                      helperText={<ErrorMessage name="confirmPassword" />}
                      InputLabelProps={{
                        sx: {
                          color: '#2d333a !important', // Change label color
                        },
                      }}
                      sx={{
                        mb: 1.5,
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
                      sx={{ background: '#10a37f', width: '100%', mb: 2, backgroundColor: '#265A9E', color: 'white' }}
                    >
                      {t('changePassword')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
            ) : (
              <Box width={250}>
              <Typography fontSize={20} fontWeight={700} mb={1}>
                {t('enterInviteCode')}
              </Typography>
              <Typography mb={1.5}>
                {t('enterInviteCodeDescription')}
              </Typography>
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
                      type="password"
                      name="inviteCode"
                      label={t('inviteCode')}
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(<ErrorMessage name="inviteCode" />)}
                      helperText={<ErrorMessage name="inviteCode" />}
                      InputLabelProps={{
                        sx: {
                          color: '#2d333a !important', // Change label color
                        },
                      }}
                      sx={{
                        mb: 1.5,
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
                      sx={{ background: '#10a37f', width: '100%', mb: 2, backgroundColor: '#265A9E', color: 'white' }}
                    >
                      {t('applyCode')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
            )}
          </Box>

        </DialogContent>
      </Dialog>

    </UserBoxWrapper>
  );
}

