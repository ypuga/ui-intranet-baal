import axios from "axios";
import { ApiEndpoints } from "./ApiEndpoints ";


const obtenerFranseDia = async () => {
    try {
        const resp = await axios.get(`${ApiEndpoints.FRONT.FRONT_FRASE}`);
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

const obtenerSolicitudes = async (sucursal) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.FRONT.FRONT_SOLICITUDES}?sucLogin=${sucursal}`);
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

const obtenerTramites = async (sucursal) => {
    try {
        const resp = await axios.get(`${ApiEndpoints.FRONT.FRONT_TRAMITES}?sucLogin=${sucursal}`);
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

export default {obtenerFranseDia, obtenerSolicitudes, obtenerTramites}