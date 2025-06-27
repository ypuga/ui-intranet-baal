import FrontApi from "../../Api/FrontApi";

export const startGetSolicitudes = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await FrontApi.obtenerSolicitudes(getState().sistema.sucursal);
            if (resp.status == 200 || resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startGetTramites = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await FrontApi.obtenerTramites(getState().sistema.sucursal);
            if (resp.status == 200 || resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startGetFraseDia = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await FrontApi.obtenerFranseDia();
            if (resp.status == 200 || resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}