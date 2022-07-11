import { createContext, useReducer, useEffect } from "react";

const initialState = {
  isInitialized: false,
  isAuthenticated:null,
  user: null,
  errors: "username or password is requid"
};

const INITIALIZATION = "INITIALIZATION";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER"
const LOGIN_ERROR= "login_error"

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case INITIALIZATION:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user,
        isInitialized: true,
      };
    case REGISTER:
      return{
        ...state, isAuthenticated: false, user: action.payload.user 
      }
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: true, user: null };
    case LOGIN_ERROR:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
const AuthContext = createContext(initialState);

function AuthProvider({ children }:any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const username = window.localStorage.getItem("username");
    const password = window.localStorage.getItem("password")
    if (username && password) {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: true, user: { username, password } },
      });
    } else {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, []);

  const login = ({username, password}:any, cb:any) => {
    const getUsername = window.localStorage.getItem("username")
    dispatch({ type: LOGIN_SUCCESS, payload: { user: { username, password }}});
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    cb();
   
  };

  const logout = (cb:any) => {
    dispatch({ type: LOGOUT });
    cb();
  };
  const loginErrors = (cd:any)=>{
    dispatch({type:LOGIN_ERROR})
  }
  const register = ({username, password, email}:any, cb:any) => {
    dispatch({ type: REGISTER , payload: { user: { username, password, email }}});
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("email", email)
    cb();
  } 
  
  return (
    <AuthContext.Provider value={{...state,login, logout, register,loginErrors}}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
