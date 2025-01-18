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

import { useDispatch } from 'react-redux';

import {
   LoginSocialGoogle,
   LoginSocialMicrosoft,
   LoginSocialApple
} from "reactjs-social-login";

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const appleApiKey = process.env.REACT_APP_APPLE_API_KEY;
const microsoftApiKey = process.env.REACT_APP_MICROSOFT_API_KEY;

function Auth() {

   const dispatch = useDispatch();

   const handleSuccess = (provider, data) => {
      console.log(`Login Successful with ${provider}:`, data);
   };

   const handleFailure = (provider, error) => {
      console.error(`Login Failed with ${provider}:`, error);
   };

   return (
      <>
                <Box mb={1}>
            <LoginSocialGoogle
              client_id={googleApiKey}
              onResolve={(response) => handleSuccess("Google", response)}
              onReject={(error) => handleFailure("Google", error)}
            >
              <Button
                fullWidth
                sx={{
                  borderRadius: '2px',
                  border: '1px solid gray ',
                  color: 'gray',
                  display: 'flex',
                }}>
                <Avatar
                  sx={{
                    borderRadius: 0,
                    width: 26,
                    height: 26
                  }}
                  alt='apple'
                  src='/static/images/logos/google-logo.svg'
                />
                <Typography sx={{ flex: 1, color: 'black' }}>Continue with Google</Typography>
              </Button>
            </LoginSocialGoogle>
          </Box>
          <Box mb={1}>
            <LoginSocialMicrosoft
              client_id="YOUR_MICROSOFT_CLIENT_ID"
              onResolve={(response) => handleSuccess("Microsoft", response)}
              onReject={(error) => handleFailure("Microsoft", error)}
            >
              <Button
                fullWidth
                sx={{
                  borderRadius: '2px',
                  border: '1px solid gray',
                  color: 'gray'
                }}>
                <Avatar
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: 0,
                  }}
                  alt='microsoft'
                  src='/static/images/logos/microsoft-logo.svg'
                />
                <Typography sx={{ flex: 1, color: 'black' }}>Continue with Microsoft Account</Typography>
              </Button>
            </LoginSocialMicrosoft>
          </Box>
          <Box>
            <LoginSocialApple
              client_id="YOUR_APPLE_CLIENT_ID"
              redirect_uri="YOUR_APPLE_REDIRECT_URI"
              onResolve={(response) => handleSuccess("Apple", response)}
              onReject={(error) => handleFailure("Apple", error)}
            >
              <Button
                fullWidth
                sx={{
                  borderRadius: '2px',
                  border: '1px solid gray ',
                  color: 'gray',
                }}>
                <Avatar
                  sx={{
                    borderRadius: 0,
                    width: 26,
                    height: 26
                  }}
                  alt='apple'
                  src='/static/images/logos/apple-logo.svg'
                /><Typography sx={{ flex: 1, color: 'black' }}>Continue with Apple</Typography>
              </Button>
            </LoginSocialApple>
          </Box>
      </>
   );
}

export default Auth;
