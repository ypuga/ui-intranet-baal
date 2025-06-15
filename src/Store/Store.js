import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "./Authetication/Authentication";
import { dataSlice } from "./Datos/Datos";
import { prospectosSlice } from "./Prospectos/Prospectos";
import { clientesSlice } from "./Clientes/Clientes";


const store = configureStore({
    reducer: {
      sistema: authenticationSlice.reducer,
      data: dataSlice.reducer,
      prospectos: prospectosSlice.reducer,
      clientes: clientesSlice.reducer,
    },
  });
  
  export default store;