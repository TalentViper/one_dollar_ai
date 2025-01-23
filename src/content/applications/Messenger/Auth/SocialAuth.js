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
import { useInviteInteraction } from "src/contexts/InviteContext";

const googleAppID = process.env.REACT_APP_GG_APP_ID;

function Auth(props) {
  const { inviteCode, mustSignedInvitedUser } = useInviteInteraction();

  const dispatch = useDispatch();
  const { socialLogin } = useAuth();
  const { t } = useTranslation();

  const handleSuccess = async ({provider, data}) => {
    const u_data = {
      provider, access_token: data.access_token
    }
    if (inviteCode && mustSignedInvitedUser) {
      u_data.invite_code = inviteCode
    }
    let response = await socialLogin(u_data)
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
