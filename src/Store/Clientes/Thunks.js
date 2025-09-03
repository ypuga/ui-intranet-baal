import ClientesApi from "../../Api/ClientesApi";
import { setBeneficiariosCliente, setBp, setCliente, setCreditosCliente, setCuenta, setCuentasCliente } from "./Clientes";

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

export const startAsignarTarjetaDebitoUnico = (idCuenta) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.asignarTarjetaDebito(
                idCuenta,
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

export const startAsignarTarjetaCreditoUnico = (idCuenta) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.asignarTarjetaCredito(
                idCuenta,
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

export const startAsignarTarjetaCreditoIdCredito = (idCredito) => {
    return async (dispatch, getState) => {
        try {
            const resp = await ClientesApi.asignarTarjetaCredito(
                idCredito,
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

export const startObtenerCuentasYCreditosDelCliente = (idClienteUnico) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.obtenerCuentasCliente(idClienteUnico);
        try {
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setCuentasCliente(resp.data));
            } else {
                return resp;
            }
            const respDos = await ClientesApi.obtenerCreditosCliente(idClienteUnico);
            if (respDos.status == 200 || respDos.status == 'OK') {
                await dispatch(setCreditosCliente(respDos.data));
                return resp;
            } else {
                return resp;
            }

        } catch (error) {
            throw error;
        }
    }
}

export const strartObtenerCuentasCliente = (idClienteUnico) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.obtenerCuentasCliente(idClienteUnico);
        try {
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

export const startObtenerCreditosCliente = (idClienteUnico) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.obtenerCreditosCliente(idClienteUnico);
        try {
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

export const startObtenerBeneficiariosCliente = (idClienteUnico) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.obtenerBeneficiariosCliente(idClienteUnico);
        try {
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setBeneficiariosCliente(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startObtenerOfertasClientes = (idClienteUnico) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.obtenerOfertasCliente(idClienteUnico);
        try {
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

export const startCertificarTelefonoCliente = (idClienteUnico, phone) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.certificarCorreoCliente(idClienteUnico, phone);
        try {
            if (resp.status == 200 || resp.status == 'OK') {
                await dispatch(setBeneficiariosCliente(resp.data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startCancelarCuentaClientes = (idCuenta) => {
    return async (dispatch, getState) => {
        const resp = await ClientesApi.cancelarCuentaCliente(idCuenta, getState().sistema.user);
        try {
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

export const startPutCliente = (idClienteUnico) => {
    return async (dispatch, getState) => {
        dispatch(setCliente({idClienteUnico}))
    }
}

export const startPutCuentaCliente = (cuenta) => {
    return async (dispatch, getState) => {
        dispatch(setCuentasCliente({cuenta}));
    }
}