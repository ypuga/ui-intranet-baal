import SolicitudesApi from "../../Api/SolicitudesApi";
import IDProductosUtil from "../../Utils/IDProductosUtil";
import { setPersonalData, setSolicitud } from "./Prospectos";

export const startSaveProspectoPersonalData = (data) => {
    return async (dispatch, getState) => {
        try {
           await dispatch(setPersonalData(data));
        } catch (error) {
            throw error;
        }
    }
}

export const startCreateNewSolicitud = (producto) => {
    return async(dispatch, getState) => {
        const createSolicitudRequest = {
            idProduct: IDProductosUtil.getIdByName(producto),
            sucursal: getState().sistema.sucursal,
            sameIne: false
        }
        try {
            const resp = await SolicitudesApi.createNewSolicitud(createSolicitudRequest);
            dispatch(setSolicitud(resp?.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const startNextStep = () => {
    return async(dispatch, getState) => {
        try {
            await SolicitudesApi.next(getState().prospectos.solicitud.idSolicitud);
        } catch (error) {
            console.log(error);
        }
    }
}