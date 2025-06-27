import axios from "axios";
import { ApiEndpoints } from "./ApiEndpoints ";


const altaClienteUnico = async (idSolicitud) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.CLIENTES.ALTA_CLIENTE}${idSolicitud}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
};

const altaCuentaCliente = async (idSolicitud, idClienteUnico) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.CLIENTES.ALTA_CUENTA_CLIENTE}${idSolicitud}?idClienteUnico=${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
};

const asignarTarjetaDebito = async (idCuenta, idEmpleado, idSucursal) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.ASIGNAR_TDD}${idCuenta}?idEmpleado=${idEmpleado}&idSucursal=${idSucursal}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
}

const obtenerInformacionCliente = async (parametro, referencia, segmento) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_CLIENTE}/${parametro}/${referencia}/${segmento}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
}

const obtenerCarteraClientes = async (idEjecutivo) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_CARTERA}${idEjecutivo}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
}

const altaCredito = async (idSolicitud, idClienteUnico ) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.CLIENTES.ALTA_CREDITO}${idSolicitud}?idClienteUnico=${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
}

const asignarTarjetaCredito = async (idCuenta, idEmpleado, idSucursal) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.ASIGNAR_TDC}${idCuenta}?idEmpleado=${idEmpleado}&idSucursal=${idSucursal}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
}

export default { altaClienteUnico, altaCuentaCliente, asignarTarjetaDebito, obtenerInformacionCliente
    ,obtenerCarteraClientes, asignarTarjetaCredito, altaCredito
 }