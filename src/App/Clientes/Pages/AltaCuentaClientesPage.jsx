import React, { useState } from 'react'
import AppLayout from '../../Layout/AppLayout';
import StepperComponent from '../../Global/Components/StepperAltaClienteComponent';
import { cuentaClientesSteps } from '../../../Data/Steps'
import { Box } from '@mui/material';
import BusquedaCliente from '../../Global/Views/BusquedaCliente';
import BiometriaCliente from '../../Global/Views/BiometriaCliente';
import { SeleccionCuentaClienteView } from '../Views/SeleccionCuentaClienteView';
import AltaBanqueroPersonal from '../../Global/Views/AltaBanqueroPersonal';
import AltaKyC from '../../Global/Views/AltaKyC';
import AltaBeneficiarios from '../../Global/Views/AltaBeneficiarios';
import DocumentsProgress from '../../Global/Views/AltaDocumentacion';
import { altaCuentaDocumentos } from '../../../Data/MocksDocumentos';
import AltaCuenta from '../Views/AltaCuenta';

const AltaCuentaClientesPage = () => {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 12));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  return (
    <AppLayout>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        sx={{ overflow: 'hidden' }}
      >
        <Box width="300px" height="100%" sx={{ borderRight: '1px solid #e0e0e0' }}>
          <StepperComponent activeStep={activeStep} steps={cuentaClientesSteps} />
        </Box>
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          sx={{ overflow: 'auto' }}
        >
          {activeStep === 0 && (
            <BusquedaCliente onNext={handleNext} />
          )}
          {activeStep === 1 && (
            <BiometriaCliente onNext={handleNext} />
          )}
          {activeStep === 2 && (
            <SeleccionCuentaClienteView onNext={handleNext} />
          )}
          {activeStep === 3 && (
            <AltaBanqueroPersonal onNext={handleNext} />
          )}
          {activeStep === 4 && (
            <AltaKyC onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 5 && (
            <AltaBeneficiarios onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 6 && (
            <DocumentsProgress onNext={handleNext} documents={altaCuentaDocumentos} onBack={handleBack}/>
          )}
          {activeStep === 7 && (
            <AltaCuenta onNext={handleNext}/>
          )}
        </Box>
      </Box>
    </AppLayout>
  )
}

export default AltaCuentaClientesPage