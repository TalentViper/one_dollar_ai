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

import SignIn from './SignIn';
import SignUp from './SignUp';
import Social from './SocialAuth';

function Auth() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [isSignIn, setIsSignIn] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setIsSignIn(true);
    }, 500);
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
            padding: 3,
            width: 400,
          }}>
          <Box display="flex" justifyContent='center'>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#265A9E' }}>
              OneDollar
            </Typography>
            <Typography fontWeight={700} fontSize={30} sx={{ color: '#227ff3' }}>
              AI
            </Typography>
          </Box>
          {isSignIn ? (
            <>
              <SignIn />
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2">
                  Don't have an account?
                  &nbsp;
                </Typography>
                <Button
                  sx={{ color: '#10a37f' }}
                  color="primary" size="small"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  Sign Up
                </Button>
              </Box>
            </>
          ) : (
            <>
              <SignUp />
              <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2">
                  Already have an account?
                  &nbsp;
                </Typography>
                <Button
                  sx={{ color: '#10a37f' }}
                  color="primary" size="small"
                  onClick={() => setIsSignIn(!isSignIn)}
                >
                  Login
                </Button>
              </Box>
            </>
          )}
          <Divider sx={{ borderColor: 'red !important', mb: 2 }}>OR</Divider>
          {/* <GoogleOAuthProvider clientId={googleApiKey}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              buttonText="Continue with Google"
            />
          </GoogleOAuthProvider> */}
          <Social />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Auth;
