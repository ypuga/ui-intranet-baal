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
        const message = error.response?.data?.message || error.message || 'Error al dar de alta al cliente';
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
        const message = error.response?.data?.message || error.message || 'No se pudo dar de alta la cuenta';
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
        const message = error.response?.data?.message || error.message || 'Error desconocido al asignar la tarjeta';
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
        const message = error.response?.data?.message || error.message || 'No se pudo obtener informacion del cliente';
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
        const message = error.response?.data?.message || error.message || 'Error desconocido';
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
        const message = error.response?.data?.message || error.message || 'Error desconocido';
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
        const message = error.response?.data?.message || error.message || 'Error desconocido';
        return {
            status,
            message
        };
    }
}

const obtenerCuentasCliente = async (idClienteUnico) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_CUENTAS_CLIENTE}${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

const obtenerCreditosCliente = async (idClienteUnico) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_CREDITOS_CLIENTE}${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

const obtenerBeneficiariosCliente = async (idClienteUnico) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_BENEFICIARIOS_CLIENTE}${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

const certificarCorreoCliente = async (idClienteUnico, telefono) => {
    try {
        const resp = await axios.put(`${ApiEndpoints.CLIENTES.CERTIFICACION_PHONE}${idClienteUnico}?noTelefono=${telefono}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

const obtenerOfertasCliente = async (idClienteUnico) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.CLIENTES.OBTENER_OFERTAS_CLIENTE}${idClienteUnico}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

const cancelarCuentaCliente = async (idClienteUnico, idEmpleado) => {
    try {
        const resp = await axios.put(`${ApiEndpoints.CLIENTES.CANCELAR_CUENTA_CLIENTE}${idClienteUnico}?idEmpleado=${idEmpleado}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error';
        return {
            status,
            message
        };
    }
}

export default { altaClienteUnico, altaCuentaCliente, asignarTarjetaDebito, obtenerInformacionCliente
    ,obtenerCarteraClientes, asignarTarjetaCredito, altaCredito, obtenerCuentasCliente, obtenerCreditosCliente,
    obtenerBeneficiariosCliente, certificarCorreoCliente, obtenerOfertasCliente, cancelarCuentaCliente
 }