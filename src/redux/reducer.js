import {initialState} from './state';
import {types} from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA: //Відкривати/закривати вікно
      return {
        ...state,
        user: action.data,
        auth: action.auth,
      };
    case types.OPEN_MODAL_WINDOW: //Відкривати/закривати вікно
      console.log(action.toggle);
      console.log(state.currentWindow)
      if (action.toggle !== state.currentWindow) {
        return {
          ...state,
          // [action.toggle]: !state[action.toggle],
          isModalOpened: true,
          currentWindow: action.toggle,
          left: "50vw",
          top: "50vh"
        }
      } else {
        console.log("Modal is closed!")
        return {
          ...state,
          isModalOpened: false,
          currentWindow: ""
        }
      }
      case types.OPEN_LOGIN_DEFINITELY:
      return {
        ...state,
        isModalOpened: true,
        currentWindow: "isLogInOpened",
        left: "50vw",
        top: "50vh"
      };
    case types.CLOSE_WINDOW:
      return {
        ...state,
        isModalOpened: false,
        currentWindow: "",
      };
    case types.CHANGE_WINDOW: //Переключитись мєжду модальними вікнами
      return {
        ...state,
        [action.toggle]: true, //Нове відкрити
        [state.currentWindow]: false, //Поточне закрити
        currentWindow: action.toggle, //Змінити поточне на нове.
      };
    case types.SET_REMOVE: //Переміщення модального вікна по екрану.
      return {
        ...state,
        left: action.left,
        top: action.top
      };
    default:
      return state;
  }

};

export default reducer;
