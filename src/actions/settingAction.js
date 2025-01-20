import {
   SET_MODEL,
   TOOGLE_LANAUAGE,
   SET_LANGUAGE,
} from './types';

export const selectModel = (model) => (dispatch) => {
  dispatch({
    type: SET_MODEL,
    payload : { model }
  });
};

export const toogleLanguage = (val) => (dispatch) => {
  dispatch({
    type: TOOGLE_LANAUAGE,
    payload : { val }
  });
};

export const setLanguage = (lang) => (dispatch) => {
  dispatch({
    type : SET_LANGUAGE,
    payload : {lang}
  })
}

// export const setActiveChatId = (data) => (dispatch) => {
//   const { chatId } = data;

//   dispatch({
//     type: SET_ACTIVECHAT_ID,
//     payload: { chatId }
//   });
// };

// export const deleteChat = (data) => (dispatch) => {
//   const { chat_id } = data;
//   dispatch({
//     type: DELETE_CHAT,
//     payload: { chat_id }
//   });
// };
