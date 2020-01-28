import {initialState} from './state';
import {types} from './actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DATA: //Відкривати/закривати вікно
      return {
        ...state,
        user: action.data,
        auth: action.auth,
        token: action.token
      };
    case types.OPEN_MODAL_WINDOW: //Відкривати/закривати вікно
      if (action.toggle !== state.currentWindow) {
        return {
          ...state,
          isModalOpened: true,
          currentWindow: action.toggle,
          left: "50vw",
          top: "50vh"
        }
      } else {
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
    case types.OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened
      };
    case types.SET_ACTIVE_PAGE: //Переміщення модального вікна по екрану.
      return {
        ...state,
        activePage: action.id
      };
    case types.SAVE_FILES:
      return {
        ...state,
        files: action.files,
        filesFormData: action.filesFormData //ready to send for multer
      };
    case types.SAVE_MODEL_ID:
      return {
        ...state,
        modelId: action.id
      };
    case types.TOGGLE_USER_INFO:
      return {
        ...state,
        isUserInfoOpened: !state.isUserInfoOpened
      };

    default:
      return state;
  }

};

export default reducer;
