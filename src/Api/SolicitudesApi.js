import axios from "axios";
import { ApiEndpoints } from "./ApiEndpoints ";

const createNewSolicitud = async (data) => {
    try {
        const resp = await axios.post(ApiEndpoints.SOLICITUDES.NEW_SOLICITUD, data);
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

const savePersonalData = async (idSolicitud, data) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.POST_PERSONAL_DATA}${idSolicitud}`, data);
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || '';
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            data,
            message
        };
    }
}

const savePersonalBanking = async (idSolicitud, data) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.POST_PERSONAL_BANKING}${idSolicitud}`, data);
        return {
            status: resp?.data?.statusCode,
            message: resp?.data?.message,
            data: resp?.data?.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || '';
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            data,
            message
        };
    }
}

const saveContactInfo = async (idSolicitud, data) => {
    try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.SAVE_CONTACT_INFO}${idSolicitud}`, data);
        return {
            status: resp?.data?.statusCode,
            message: resp?.data?.message,
            data: resp?.data?.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || '';
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            data,
            message
        };
    }
}

const certificaContacto = async (idSolicitud) => {
    try {
        const resp = await axios.put(`${ApiEndpoints.SOLICITUDES.CERTIFY_CONTACTO_INFO}${idSolicitud}`);
        return {
            status: resp?.data?.statusCode,
            message: resp?.data?.message,
            data: resp?.data?.response
        };
    } catch (error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || '';
        const message = error.response?.data?.message || error.message || 'Error desconocido al crear la solicitud';
        return {
            status,
            data,
            message
        };
    }
}

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

const saveDomicilio = async (idSolicitud, domicilioData) => {
       try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.SAVE_ADRESS_DATA}${idSolicitud}`,domicilioData);
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
}

const altaKyc = async (idSolicitud, kycData) => {
       try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.SAVE_KYC_DATA}${idSolicitud}`,kycData);
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
}

const saveFiscalData = async (idSolicitud, fiscalData) => {
       try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.SAVE_FISCAL_DATA}${idSolicitud}`,fiscalData);
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
}

const saveBeneficiarios = async (idSolicitud, beneficiariosData) => {
       try {
        const resp = await axios.post(`${ApiEndpoints.SOLICITUDES.SAVE_BENEFICIARIES}${idSolicitud}`,beneficiariosData);
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
}

const getDocumentacion = async (idSolicitud) => {
       try {
        const resp = await axios.get(`${ApiEndpoints.SOLICITUDES.GET_DOCUMENTATION}${idSolicitud}`);
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
}

export default { createNewSolicitud, next, savePersonalData, savePersonalBanking, saveContactInfo,
    certificaContacto, saveDomicilio, altaKyc, saveFiscalData, saveBeneficiarios, getDocumentacion
 };
