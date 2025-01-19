import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogContent,
} from '@mui/material';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Social from './SocialAuth';
import { useAuth } from 'src/contexts/AuthContext';

function Auth() {
  const { user, logoutUser } = useAuth(); 
  const [open, setOpen] = useState(false);

  const [isSignIn, setIsSignIn] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    setIsSignIn(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      {
        user ? (
          <Button
            onClick={logoutUser}
            sx={{
              background: '#265A9E',
              color: 'white',
            }}
            fullWidth
            variant="contained" color='primary' size='medium'>
            Logout
          </Button>
        ) : (
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
        )
      }

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
              <SignIn modalClose={handleClose} />
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
              <SignUp switchSignpage={setIsSignIn} />
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

          <Social isSignIn={isSignIn} modalClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Auth;
