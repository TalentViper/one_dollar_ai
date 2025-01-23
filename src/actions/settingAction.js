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
