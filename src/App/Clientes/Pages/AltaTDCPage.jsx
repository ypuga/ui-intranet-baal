import { Box } from '@mui/material'
import React, { useState } from 'react'
import AppLayout from '../../Layout/AppLayout'
import StepperComponent from '../../Global/Components/StepperAltaClienteComponent'
import { tdcSteps } from '../../../Data/Steps'
import BusquedaCliente from '../../Global/Views/BusquedaCliente'
import BiometriaCliente from '../../Global/Views/BiometriaCliente'
import AltaBanqueroPersonal from '../../Global/VIews/AltaBanqueroPersonal'
import AltaBuroCredito from '../../Global/Views/AltaBuroCredito'
import SeleccionTDC from '../Views/SeleccionTDC'
import KycTdcView from '../Views/KycTdcView'
import DocumentsProgress from '../../Global/Views/AltaDocumentacion'
import { altaTDC, altaTDCDocumentos } from '../../../Data/MocksDocumentos'
import EnvioSolicitudCredito from '../Views/EnvioSolicitudCredito'
import AltaTdc from '../Views/AltaTdc'
import AltaReferenciasCliente from '../../Global/Views/AltaReferenciasCliente'

const AltaTDCPage = () => {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 12));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleStep = (step) => {
    setActiveStep(step);
  }

  return (
    <AppLayout>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        sx={{ overflow: 'hidden' }}
      >
        <Box width="300px" height="100%" sx={{ borderRight: '1px solid #e0e0e0' }}>
          <StepperComponent activeStep={activeStep} steps={tdcSteps} />
        </Box>
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          sx={{ overflow: 'auto' }}
        >
          {activeStep === 0 && (
            <BusquedaCliente onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 1 && (
            <BiometriaCliente onNext={handleNext} />
          )}
          {activeStep === 2 && (
            <SeleccionTDC onNext={handleNext} />
          )}
          {activeStep === 3 && (
            <AltaBanqueroPersonal onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 4 && (
            <AltaBuroCredito onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 5 && (
            <KycTdcView onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 6 && (
            <AltaReferenciasCliente onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 7 && (
            <DocumentsProgress onNext={handleNext} onBack={handleBack} documents={altaTDCDocumentos} />
          )}
          {activeStep === 8 && (
            <EnvioSolicitudCredito onNext={handleNext} />
          )}
          {activeStep === 9 && (
            <DocumentsProgress onNext={handleNext} documents={altaTDC} />
          )}
          {activeStep === 10 && (
            <AltaTdc />
          )}
        </Box>
      </Box>
    </AppLayout>
  )
}

export default AltaTDCPage
