export const initialState = {
  auth: false,
  user: { username: null, email: null},
  isModalOpened: false,
  isSignUpOpened: false,
  isLogInOpened: false,
  currentWindow: "",
  left: "50vw",
  top: "50vh",
  isSidebarOpened: false,
  activePage: window.location.pathname === "/" ? "home" : window.location.pathname,
  pages: ["home", "collections", "news"],
};
