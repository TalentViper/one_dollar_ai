import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  LoginSocialGoogle,
} from "reactjs-social-login";

import { login } from "src/services/authService"
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "src/actions/types"

const googleAppID = process.env.REACT_APP_GG_APP_ID;

function Auth(props) {

  const dispatch = useDispatch();

  const handleSuccess = async ({provider, data}) => {
    let response = await login(provider, data.access_token)
    if (response.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      })
      props.modalClose()
    }
  };

  const handleFailure = ({provider, error}) => {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error
    })
  };

  return (
    <>
      <Box mb={1}>
        <LoginSocialGoogle
          client_id={googleAppID}
          onResolve={handleSuccess}
          onReject={handleFailure}
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
      
    </>
  );
}

export default Auth;
