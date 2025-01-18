import {
  SET_MESSAGES,
  ADD_SUB_MESSAGE,
  SET_INCREASE_CHAT_ID,
  SET_ACTIVECHAT_ID,
  DELETE_CHAT
} from './types';

export const userSignUp = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/register/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const resdata = await response.json();
    if (response.status === 201) {
      return true
    } else {
      console.error("An Error Occured");
    }
  } catch (error) {
    console.error(error);
  }
};

export const userSignIn = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/login/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const data = await response.json();

    // if (response.status === 200) {
    //   setAuthTokens(data);
    //   setUser(jwtDecode(data.access));
    //   localStorage.setItem("authTokens", JSON.stringify(data));
    // } else {
    //   console.error("An Error Occured");
    // }
  } catch (error) {
    console.error(error);
  }
};
