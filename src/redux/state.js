export const initialState = {
  token: null,
  auth: false, //duplicated token -_-
  user: {username: null, email: null},
  isModalOpened: false,
  isSignUpOpened: false,
  isLogInOpened: false,
  currentWindow: "",
  left: "50vw",
  top: "50vh",
  isSidebarOpened: false,
  activePage: null,
  pages: ["", "collections", "news"],
  files: [],
  filesFormData: null,
  isUserInfoOpened: false,
  isReadyForScreen: false,
  modelId: null
};
