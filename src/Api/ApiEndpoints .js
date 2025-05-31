
export class ApiEndpoints  {

    static BASE_URL = 'http://localhost:8200/baalap/api/v1';

    static SOLICITUDES = {
        NEW_SOLICITUD: this.BASE_URL+'/prospecto/solicitud/new',
        NEXT_STEP: this.BASE_URL+'/prospecto/solicitud/next/',
        POST_PERSONAL_DATA: this.BASE_URL+'/prospecto/personalData/save/',
        POST_PERSONAL_BANKING: this.BASE_URL+'/prospecto/bp/save/',
        SAVE_CONTACT_INFO: this.BASE_URL+'/prospecto/contacto/save/',
        CERTIFY_CONTACTO_INFO: this.BASE_URL+'/prospecto/contacto/certifica/'
    }   

}