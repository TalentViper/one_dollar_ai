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
import { useTranslation } from 'react-i18next';
import { useAuth } from "src/contexts/AuthContext"

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "src/actions/types"

const googleAppID = process.env.REACT_APP_GG_APP_ID;

function Auth(props) {

  const dispatch = useDispatch();
  const { socialLogin } = useAuth();
  const { t, i18n } = useTranslation();

  const handleSuccess = async ({provider, data}) => {
    let response = await socialLogin(provider, data.access_token)
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
              src='/static/images/logo/google.svg'
            />
            <Typography sx={{ flex: 1, color: 'black' }}>{t('continueWithGoogle')}</Typography>
          </Button>
        </LoginSocialGoogle>
      </Box>
      
    </>
  );
}

export default Auth;
