import { jwtDecode } from "jwt-decode";
import AuthApi from "../../Api/AuthApi"
import { setIsCheking, setLogIn, setLogOut } from "./Authentication";

export const loginApp = (data) => {
  return async (dispatch) => {
      try {
          const resp = await AuthApi.login(data); 
          if (resp.status === 200) {
              localStorage.setItem('Bearer', resp.data.token);
              const decodedToken = jwtDecode(resp.data.token);
              dispatch(setLogIn(decodedToken));
          }
      } catch (error) {
              throw({ type: 'LOADING_USER_FAILURE', error: error.data || 'Error en el login' });
      }
  };
};


export const logOutApp = () => {
  return async(dispatch)=>{
    localStorage.setItem('Bearer', '');
    dispatch(setLogOut());
  }
}

export const startCheckSesion = () => {
  return async (dispatch) => {
    dispatch(setIsCheking(true));
    const token = localStorage.getItem('Bearer');
    if (!token) {
        dispatch(setIsCheking());
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch(setIsCheking());
      } else {
        dispatch(setLogIn(decodedToken));
      }
    } catch (error) {
        dispatch(setIsCheking());
    }
  };
};




