import SolicitudesApi from "../../Api/SolicitudesApi";
import IDProductosUtil from "../../Utils/IDProductosUtil";
import { setPersonalData, setSolicitud } from "./Prospectos";

export const startSaveProspectoPersonalData = (data) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.savePersonalData(getState().prospectos.solicitud.idSolicitud, data);
            if (resp.status == 200) {
                await dispatch(setPersonalData(data));
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startSavePersonalBanking = (personalBankingData) => {
    return async (dispatch, getState) => {
        const data = {
            bpLogin: parseInt(getState().sistema?.user),
            sucLogin: getState().sistema.sucursal,
            bpSolicitud: personalBankingData?.bp?.noEmpleado,
            sucSolicitud: personalBankingData?.sucursal
        }
        try {
            const resp = await SolicitudesApi.savePersonalBanking(getState().prospectos.solicitud.idSolicitud, data)
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startSaveContactInfo = (data) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveContactInfo(getState().prospectos.solicitud.idSolicitud, data)
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startSaveDomicilio = (domicilioData) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveDomicilio(getState().prospectos.solicitud.idSolicitud, domicilioData);
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAltaKyc = (kycData) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.altaKyc(getState().prospectos.solicitud.idSolicitud, kycData);
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startSaveFiscalData = (fiscalData) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveFiscalData(getState().prospectos.solicitud.idSolicitud, fiscalData);
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startCertificaMedioContacto = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.certificaContacto(getState().prospectos.solicitud.idSolicitud)
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startAltaBeneficiarios = (beneficiariosData) => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveBeneficiarios(getState().prospectos.solicitud.idSolicitud, beneficiariosData)
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startGetClientDocumentation = () => {
    return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.getDocumentacion(getState().prospectos.solicitud.idSolicitud)
            if (resp.status == 'OK') {
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }
}

export const startRetomarSolicitud = (data) => {
    return async (dispatch, getState) => {
        dispatch(setSolicitud(data));
    }
}

export const startCreateNewSolicitud = (producto) => {
    return async (dispatch, getState) => {
        const createSolicitudRequest = {
            idProduct: IDProductosUtil.getIdByName(producto),
            sucursal: getState().sistema.sucursal,
            sameIne: false
        }
        try {
            const resp = await SolicitudesApi.createNewSolicitud(createSolicitudRequest);
            dispatch(setSolicitud(resp?.data));
        } catch (error) {
            console.error(error);
        }
    }
}

export const startNextStep = () => {
    return async (dispatch, getState) => {
        try {
            await SolicitudesApi.next(getState().prospectos.solicitud.idSolicitud);
        } catch (error) {
            console.log(error);
        }
    }
}