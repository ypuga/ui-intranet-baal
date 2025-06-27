import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cliente: {},
    cuenta: {},
    banqueroPersonal: {}
};

export const clientesSlice = createSlice({
    name: 'clientes',
    initialState,
    reducers: {
        setCliente: (state, action) => {
            state.cliente = action.payload;
        },
        setCuenta: (state, action) => {
            state.cuenta = action.payload;
        },
        setBp: (state, action) => {
            state.banqueroPersonal = action.payload
        },
        resetAuthState: () => initialState
    }
});

export const {setCliente, setCuenta, setBp, resetAuthState} = clientesSlice.actions;

export default clientesSlice.reducer;