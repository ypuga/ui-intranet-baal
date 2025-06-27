import { Box } from '@mui/material';
import React, { useState } from 'react';
import AppLayout from '../../Layout/AppLayout';
import AltaCertificacionContacto from '../../Global/VIews/AltaCertificacionContacto';
import AltaFiscalData from '../../Global/VIews/AltaFiscalData';
import AltaBeneficiarios from '../../Global/VIews/AltaBeneficiarios';
import AltaBiometria from '../../Global/VIews/AltaBiometria';
import AltaCliente from '../../Global/VIews/AltaCliente';
import ConfirmacionCuenta from '../../Global/VIews/ConfirmacionCuenta';
import AltaDomicilioData from '../../Global/VIews/AltaDomicilioData'
import StepperComponent from '../../Global/Components/StepperAltaClienteComponent';
import { altaClienteSteps } from '../../../Data/Steps';
import AltaBanqueroPersonal from '../../Global/VIews/AltaBanqueroPersonal';
import AltaKyC from '../../Global/Views/AltaKyC';
import DocumentsProgress from '../../Global/Views/AltaDocumentacion';
import AltaPersonalData from '../../Global/Views/AltaPersonalData';
import { useLoading } from '../../../Hooks/LoadingContext';
import { useDispatch, useSelector } from 'react-redux';
import { startNextStep } from '../../../Store/Prospectos/Thunks';

const AltaClientePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();
  const {solicitud} = useSelector(state=>state.prospectos);

  const handleNext = async () => {
    startLoading();
    try {
      await dispatch(startNextStep());
    } catch (error) {
      console.log(error);
    } finally {
      setActiveStep((prevStep) => Math.min(prevStep + 1, 10));
      stopLoading();
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  };

    const handlePersonalizado = (actualStep) => {
    setActiveStep(actualStep);
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
          <StepperComponent activeStep={activeStep} steps={altaClienteSteps} />
        </Box>
        <Box
          flex={1}
          height="100%"
          display="flex"
          flexDirection="column"
          sx={{ overflow: 'auto' }}
        >
          {activeStep === 0 && (
            <AltaPersonalData onNext={handleNext} actualStep={(step)=>handlePersonalizado(step)}/>
          )}
          {activeStep === 1 && (
            <AltaBanqueroPersonal onNext={handleNext} />
          )}
          {activeStep === 2 && (
            <AltaCertificacionContacto onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 3 && (
            <AltaDomicilioData onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 4 && (
            <AltaKyC onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 5 && (
            <AltaFiscalData onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 6 && (
            <AltaBeneficiarios onNext={handleNext} onBack={handleBack}/>
          )}
          {activeStep === 7 && (
            <AltaBiometria onNext={handleNext} />
          )}
          {activeStep === 8 && (
            <DocumentsProgress onNext={handleNext}/>
          )}
          {activeStep === 9 && (
            <AltaCliente onNext={handleNext} />
          )}
          {activeStep === 10 && (
            <ConfirmacionCuenta/>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
};

export default AltaClientePage;