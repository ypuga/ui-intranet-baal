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

export default {altaClienteUnico, altaCuentaCliente, asignarTarjetaDebito}