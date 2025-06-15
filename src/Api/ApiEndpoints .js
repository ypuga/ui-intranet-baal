
export class ApiEndpoints  {

    static BASE_URL = 'http://localhost:8200/baalap/api/v1';

    static SOLICITUDES = {
        NEW_SOLICITUD: this.BASE_URL+'/prospecto/solicitud/new',
        NEXT_STEP: this.BASE_URL+'/prospecto/solicitud/next/',
        POST_PERSONAL_DATA: this.BASE_URL+'/prospecto/personalData/save/',
        POST_PERSONAL_BANKING: this.BASE_URL+'/prospecto/bp/save/',
        SAVE_CONTACT_INFO: this.BASE_URL+'/prospecto/contacto/save/',
        CERTIFY_CONTACTO_INFO: this.BASE_URL+'/prospecto/contacto/certifica/',
        SAVE_ADRESS_DATA: this.BASE_URL+'/prospecto/domicilio/save/',
        SAVE_KYC_DATA: this.BASE_URL+'/prospecto/kyc/save/',
        SAVE_FISCAL_DATA: this.BASE_URL+'/prospecto/fiscalData/save/',
        SAVE_BENEFICIARIES: this.BASE_URL+'/prospecto/beneficiarios/save/',
        GET_DOCUMENTATION: this.BASE_URL+'/prospecto/documentos/',
    }   

    static CLIENTES = {
        ALTA_CLIENTE: this.BASE_URL+'/cliente/cliente/alta/',
        ALTA_CUENTA_CLIENTE: this.BASE_URL+ '/cliente/cuentas/alta/',
        ASIGNAR_TDD: this.BASE_URL+'/cliente/tarjeta/asignar/debito/'
    }

}