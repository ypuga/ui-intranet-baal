import React, {useState} from 'react'
import AppLayout from '../../Layout/AppLayout'
import {Box} from "@mui/system";
import StepperComponent from "../../Global/Components/StepperAltaClienteComponent.jsx";
import {crpSteps, tdcSteps} from "../../../Data/Steps.js";
import BusquedaCliente from "../../Global/Views/BusquedaCliente.jsx";
import BiometriaCliente from "../../Global/Views/BiometriaCliente.jsx";
import AltaBanqueroPersonal from "../../Global/Views/AltaBanqueroPersonal.jsx";
import AltaBuroCredito from "../../Global/Views/AltaBuroCredito.jsx";
import AltaVisitaDomciliaria from "../../Global/Views/AltaVisitaDomciliaria.jsx";
import AltaReferenciasCliente from "../../Global/Views/AltaReferenciasCliente.jsx";

const AltaCRPPage = () => {

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
          <StepperComponent activeStep={activeStep} steps={crpSteps} />
        </Box>
        <Box
            flex={1}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ overflow: 'auto' }}>
          {activeStep === 0 && (
              <BusquedaCliente onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 1 && (
              <BiometriaCliente onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 2 && (
              <AltaBanqueroPersonal onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 3 && (
              <AltaBanqueroPersonal onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 4 && (
              <AltaBuroCredito onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 5 && (
              <AltaVisitaDomciliaria onNext={handleNext} handleStep={handleStep} />
          )}
          {activeStep === 6 && (
              <AltaReferenciasCliente onNext={handleNext} handleStep={handleStep} />
          )}
        </Box>
      </Box>
    </AppLayout>
  )
}

export default AltaCRPPage
