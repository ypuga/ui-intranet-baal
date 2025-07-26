import React, { useState } from 'react'
import AppLayout from '../../Layout/AppLayout';
import { Box } from '@mui/material';
import StepperComponent from '../../Global/Components/StepperAltaClienteComponent';
import BusquedaTramites from '../Views/BusquedaTramites';
import BiometriaCliente from '../../Global/Views/BiometriaCliente';
import { finishCrm } from '../../../Data/FinishTramitesData';
import DocumentsProgress from '../../Global/Views/AltaDocumentacion';
import { altaTDC, pagareCRM } from '../../../Data/MocksDocumentos';
import FinalizarCRM from '../Views/FinalizarCRM';
import {finishTramiteCrm } from '../../../Data/Steps';

const FinishTramiteCrmPage = () => {
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
                    <StepperComponent activeStep={activeStep} steps={finishTramiteCrm} />
                </Box>

                <Box
                    flex={1}
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    sx={{ overflow: 'auto' }}
                >
                    {activeStep === 0 && (
                        <BusquedaTramites onNext={handleNext} handleStep={handleStep} product={finishCrm} />
                    )}
                    {activeStep === 1 && (
                        <BiometriaCliente onNext={handleNext} handleStep={handleStep} />
                    )}
                    {activeStep === 2 && (
                        <DocumentsProgress onNext={handleNext} documents={altaTDC} />
                    )}
                    {activeStep === 3 && (
                        <FinalizarCRM onNext={handleNext} />
                    )}
                </Box>
            </Box>
        </AppLayout>
    )
}

export default FinishTramiteCrmPage
