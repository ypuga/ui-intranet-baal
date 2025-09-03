import { useNavigate, useSearchParams } from 'react-router-dom';
import AppLayout from '../../Layout/AppLayout'
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import DocumentsProgressManual from '../../Global/Views/DocumentsProgressManual';

import StepperComponent from '../../Global/Components/StepperAltaClienteComponent';
import { cancelacionCuenta } from '../../../Data/Steps';
import { cancelacionCuentaDocumentos } from '../../../Data/MocksDocumentos';
import ConfirmacionCancelacionCuentaView from '../Views/ConfirmacionCancelacionCuentaView';
import CancelacionDeCuentaView from '../Views/CancelacionDeCuentaView';
import BiometriaCliente from '../../Global/Views/BiometriaCliente';

const CancelarCuentaPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [searchParams] = useSearchParams();
  const cuenta = searchParams.get("cuenta");
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 12));
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleStep = (step) => {
    setActiveStep(step);
  }

  useEffect(() => {
    if (!cuenta) {
      navigate('/home');
    }
  }, [])


  return (
    <AppLayout>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        sx={{ overflow: 'hidden' }}
      >
        <Box width="300px" height="100%" sx={{ borderRight: '1px solid #e0e0e0' }}>
          <StepperComponent activeStep={activeStep} steps={cancelacionCuenta} />
        </Box>
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          sx={{ overflow: 'auto' }}
        >
          {activeStep === 0 && (
            <ConfirmacionCancelacionCuentaView onNext={handleNext} />
          )}
          {activeStep === 1 && (
            <BiometriaCliente onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 2 && (
            <DocumentsProgressManual onNext={handleNext} handleStep={handleStep} documents={cancelacionCuentaDocumentos} />
          )}
          {activeStep === 3 && (
            <CancelacionDeCuentaView onNext={handleNext} />
          )}
        </Box>
      </Box>
    </AppLayout>
  )
}

export default CancelarCuentaPage
