import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cliente: {},
    cuenta: {}
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
        resetAuthState: () => initialState
    }
});

export const {setCliente, setCuenta} = clientesSlice.actions;

export default clientesSlice.reducer;