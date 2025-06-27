import { Password } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalData: {},
    solicitud: {},
    sameIne: true
};

export const prospectosSlice = createSlice({
    name: 'prospectoPersonalData',
    initialState,
    reducers: {
        setPersonalData: (state, action) => {
            state.personalData = action.payload;
        },
        setSolicitud: (state, action) => {
            state.solicitud = action.payload;
        },
        setSameIne: (state, action) => {
            state.sameIne = action.payload;
        },
        deleteSolicitud: (status, action) => {
            state.solicitud = {};
        },
        resetAuthState: () => initialState
    }
});

export const { setPersonalData, resetAuthState, setSolicitud, setSameIne, deleteSolicitud } = prospectosSlice.actions;

export default prospectosSlice.reducer;