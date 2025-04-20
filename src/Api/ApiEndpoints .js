
export class ApiEndpoints  {

    static BASE_URL = 'http://localhost:8200/baalap/api/v1';

    static SOLICITUDES = {
        NEW_SOLICITUD: this.BASE_URL+'/prospecto/solicitud/new',
        NEXT_STEP: this.BASE_URL+'/prospecto/solicitud/next/'
    }   

}