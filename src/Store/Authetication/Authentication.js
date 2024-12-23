import { Password } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: '',
    zona: '',
    profile: '',
    titleName: '',
    sucursal: '',
    isAuth: false,
    isCheckingAuth: true,
};

export const authenticationSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setClienteAlameda: (state, action) => {
            state.clienteAlameda = action.payload;
        },
        setIsCheking: (state, action) =>{
            state.isCheckingAuth = action.payload;
        },
        setLogIn: (state, action) => {
            const { sub, zona, sucursal, profile, titleName } = action.payload;
            state.user = sub || ''; 
            state.zona = zona || '';
            state.sucursal = sucursal || '';
            state.profile = profile || '';
            state.titleName = action.payload['title-name'] || '';
            state.isAuth = true;
            state.isCheckingAuth = false;
        },
        setLogOut: (state, action)=>{
            state.user = '';
            state.zona = '';
            state.sucursal = '';
            state.profile = '';
            state.isAuth = false;
            state.isCheckingAuth = false;
        },
        resetAuthState: () => initialState
    }
});

export const { resetAuthState, setIsCheking, setLogIn, setLogOut } = authenticationSlice.actions;

export default authenticationSlice.reducer;