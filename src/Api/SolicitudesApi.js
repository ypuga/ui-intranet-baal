import axios from "axios";
import { ApiEndpoints } from "./ApiEndpoints ";

const createNewSolicitud = async (data) => {
    try {
        const resp = await axios.post(ApiEndpoints.SOLICITUDES.NEW_SOLICITUD, data);
        return {
            status: resp.status,
            message: 'Solicitud creada correctamente.',
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

const next = async (idSolicitud) => {
    try {
        const resp = await axios.put(`${ApiEndpoints.SOLICITUDES.NEXT_STEP}${idSolicitud}`);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        console.log("error",error);
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            message
        };
    }
};

export default { createNewSolicitud, next };
