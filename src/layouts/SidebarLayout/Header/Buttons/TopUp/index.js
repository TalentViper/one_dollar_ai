
import { forwardRef, useRef, useState } from 'react';
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
  Hidden,

  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';

import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);


function TopUp() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const initialValues = {
    email: '',
  };

  const [openSearchResults, setOpenSearchResults] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (values) => {
    console.log('Form submitted successfully:', values);
    // You can handle form submission here (e.g., send data to an API)
  };

  const handleLoginSuccess = (response) => {
    console.log("Login successful:", response);
    // You can use response.credential to get the Google access token and further process
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };


  return (
    <>
      <ListWrapper
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            sx={{
              ml: {
                xs : '0px',
                md : '20px',
              },
              padding: {
                xs : '0px 0px 0px 0px !important',
                md : '5px 18px !important',
              },
              borderRadius: '20px',
              border: {
                xs : 'none',
                md : '2px solid #378DFD',
              },
            }}
            // classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box
                  display="flex"
                  alignItems="center"
                  color="black"
                >
                  <Box >
                    <Box display='flex' justifyContent='center'>
                      <Typography fontWeight={700} fontSize={14} lineHeight={1.2}>
                        <span style={{ color: '#EA0004' }}>0.01$</span> &nbsp;<span style={{ color: '#265A9E' }}>left</span>
                      </Typography>
                    </Box>
                    <Typography fontWeight={700} fontSize={14} sx={{ color: '#265A9E' }}>
                      Please Top up
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>

      <Dialog
        maxWidth='xs'
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={isOpen}>
        {/* <DialogContent
          sx={{
            background: 'white',
            padding: 5
          }}>
          <Box display="flex" justifyContent='center' mb={6}>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#265A9E' }}>
              OneDollar
            </Typography>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#227ff3' }}>
              AI
            </Typography>
          </Box>
          <Box display='flex' justifyContent='center' mb={4} >
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#2d333a' }}>Create an account</Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur }) => (
              <Form>
                <Field
                  sx={{
                    marginBottom: 2,
                    '& .MuiInputBase-input': {
                      color: '#2d333a', // Font color
                      '&::placeholder': {
                        color: 'black',
                        opacity: 1,
                      },
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'black', // Border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#10a37f', // Border color when focused
                      },
                    },
                  }}
                  mb={3}
                  as={TextField}
                  name="email"
                  label="Email address"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                // error={Boolean(<ErrorMessage name="email" />)}
                // helperText={<ErrorMessage name="email" />}
                />
                <Button
                  sx={{ textAlign: 'center', background: '#10a37f', width: '100%', mb: 2, color: 'white' }}
                  type="submit"
                  size="large"
                >
                  Continue
                </Button>
              </Form>
            )}
          </Formik>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Don't have an account?{' '}
            <Button color="primary" size="small">
              Sign Up
            </Button>
          </Typography>
          <Divider sx={{ borderColor: 'red !important', mb: 2 }}>OR</Divider>
          <GoogleOAuthProvider clientId="635005707053-jhlv7oah8sdo6ogqq7kauqpde8l6f69u.apps.googleusercontent.com">
            <div>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </div>
          </GoogleOAuthProvider>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
      </Dialog>
    </>
  );
}

export default TopUp;
