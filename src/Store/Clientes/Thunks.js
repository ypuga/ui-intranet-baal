import ClientesApi from "../../Api/ClientesApi";
import { setBp, setCliente, setCuenta } from "./Clientes";

export const startAltaCliente = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.altaClienteUnico(getState().prospectos.solicitud.idSolicitud);
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setCliente(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAlataCuenta = (idClienteUnico) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.altaCuentaCliente(getState().prospectos.solicitud.idSolicitud, idClienteUnico);
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setCuenta(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAsignarTarjetaDebito = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.asignarTarjetaDebito(
                getState().clientes.cuenta.idCuenta,
                getState().sistema.user,
                getState().sistema.sucursal
            );
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

export const startObtenerClienteInfo = (parametro, reference, segmento) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.obtenerInformacionCliente(parametro, reference, segmento)
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setCliente(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startObtenerBpCliente = (parametro, reference, segmento) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.obtenerInformacionCliente(parametro, reference, segmento)
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setBp(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAltaCredito = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.altaCredito(
                getState().prospectos?.solicitud?.idSolicitud, 
                getState().clientes?.cliente?.idClienteUnico)
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setCuenta(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAsignarTarjetaCredito = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.asignarTarjetaCredito(
                getState().clientes.cuenta.idCredito,
                getState().sistema.user,
                getState().sistema.sucursal
            );
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