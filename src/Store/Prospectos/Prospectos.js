import { Password } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    personalData: {},
    solicitud: {}
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
        resetAuthState: () => initialState
    }
});

export const { setPersonalData, resetAuthState, setSolicitud } = prospectosSlice.actions;

export default prospectosSlice.reducer;