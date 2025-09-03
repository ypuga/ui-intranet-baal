import SolicitudesApi from "../../Api/SolicitudesApi";
import IDProductosUtil from "../../Utils/IDProductosUtil";
import { deleteSolicitud, resetAuthState, setPersonalData, setSameIne, setSolicitud } from "./Prospectos";

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

export const startRetomarSolicitud = (curp, idClienteUnico) => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.retomarSolicitud(curp, idClienteUnico);
            if (resp?.status == 'OK' || resp?.status == 200) {
                const data = {
                    ...resp?.data,
                    idSolicitud: resp.data?.id,
                };
                dispatch(setSolicitud(data))
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
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
            dispatch(resetAuthState());
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

export const startCreateNewSolicitudCliente = (idProduct) => {
    return async (dispatch, getState) => {
        const createSolicitudRequest = {
            idProduct: idProduct,
            sucursal: getState().sistema?.sucursal,
            sameIne: getState().prospectos?.sameIne,
            idClienteUnico: getState().clientes?.cliente?.idClienteUnico
        }
        try {
            const resp = await SolicitudesApi.createNewSolicitud(createSolicitudRequest);
            dispatch(setSolicitud(resp?.data));
            return resp;
        } catch (error) {
            console.error(error);
        }
    }
}

export const startSetSameIne = (sameIne) => {
    return async (dispatch, getState) => {
        dispatch(setSameIne(sameIne));
    }
}

export const startSaveBuroCredito = (buroData) => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveBuroCredito(getState().prospectos.solicitud.idSolicitud, buroData);
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

export const startSaveReferencias = (referenciasData) => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.saveReferencias(getState().prospectos.solicitud.idSolicitud, referenciasData);
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

export const startEnviarSolicitudCredito = () => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.altaSolicitudCredito(getState().prospectos.solicitud.idSolicitud);
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

export const startDeleteSolicitud = () => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.delteSolicitud(getState().prospectos.solicitud.id);
            if (resp.status == 'OK') {
                dispatch(deleteSolicitud());
                return resp;
            } else {
                return resp;
            }
        } catch (error) {
            throw error;
        }
    }   
}

export const startObtenerSolicitud = (idSolicitud) => {
        return async (dispatch, getState) => {
        try {
            const resp = await SolicitudesApi.obtenerSolicitud(idSolicitud);
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

export const startPutSolicitud = (solicitud) => {
    return async (dispatch, getState) => {
        const newSolicitudData = {                 
            idSolicitud: solicitud?.id
        };
        dispatch(setSolicitud(newSolicitudData));
    };
};
