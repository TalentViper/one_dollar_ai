import {
  SET_MODEL,
  TOOGLE_LANAUAGE,
  SET_LANGUAGE
} from 'src/actions/types';

const initialState = {
   model : {
    id: 'gpt-1', 
    label: 'GPT-4o mini', 
    icons: [],
    requiresPayment: false
   },
   toogleLanguage : false,
   language : 'en'
};


const modelReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_MODEL:
      return {
        ...state,
        model : action.payload.model
      };

    case TOOGLE_LANAUAGE:
      return {
        ...state,
        toogleLanguage : action.payload.val
      }
    
    case SET_LANGUAGE:
      return {
        ...state,
        language : action.payload.lang
      }  
    default:
      return state;
  }
};

export default modelReducer;
