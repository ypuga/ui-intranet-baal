export const buroCreditoUtil = (data) => {
    return {
        tarjetaCredito: data?.tdcVigente == 'Si' ? true : false,
        bancoEmison: data?.bancoTdc,
        montoCredito: data?.limiteCredito,
        creditoAutomotriz: data?.creditoAutomotriz == 'Si' ? true : false,
        creditoHipotecario: data?.creditoHipotecario == 'Si' ? true : false,
    }
}