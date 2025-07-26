import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cliente: {},
    cuenta: {},
    banqueroPersonal: {},
    cuentasCliente: {},
    creditosCliente: {},
    beneficiariosCliente: {}
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
        setCuentasCliente: (state, action) => {
            state.cuentasCliente = action.payload;
        },
        setCreditosCliente: (state, action) => {
            state.creditosCliente = action.payload;
        },
        setBeneficiariosCliente: (state, action) => {
            state.beneficiariosCliente = action.payload;
        },
        resetAuthState: () => initialState
    }
});

export const {setCliente, setCuenta, setBp, resetAuthState, 
    setCreditosCliente, setCuentasCliente, setBeneficiariosCliente
} = clientesSlice.actions;

export default clientesSlice.reducer;