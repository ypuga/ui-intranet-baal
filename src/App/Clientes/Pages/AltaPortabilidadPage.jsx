import React, { useState } from 'react'
import AppLayout from '../../Layout/AppLayout'
import { portabilidadNomina } from '../../../Data/Steps'
import { Box } from '@mui/material'
import StepperComponent from '../../Global/Components/StepperAltaClienteComponent'
import BusquedaCliente from '../../Global/Views/BusquedaCliente'
import BiometriaCliente from '../../Global/Views/BiometriaCliente'
import DocumentsProgress from '../../Global/Views/AltaDocumentacion'
import SeleccionCuentasClienteView from '../Views/SeleccionCuentasClienteView'
import AltaBanqueroPersonal from '../../Global/Views/AltaBanqueroPersonal'
import AltaCuentaOrigenPortabilidad from '../Views/AltaCuentaOrigenPortabilidad'
import { altaPortabilidadDocumentos } from '../../../Data/MocksDocumentos'

const AltaPortabilidadPage = () => {

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
                    <StepperComponent activeStep={activeStep} steps={portabilidadNomina} />
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
                        <BiometriaCliente onNext={handleNext} handleStep={handleStep} />
                    )}
                    {activeStep === 2 && (
                        <SeleccionCuentasClienteView onNext={handleNext} handleStep={handleStep} />
                    )}
                    {activeStep === 3 && (
                        <AltaBanqueroPersonal onNext={handleNext} handleStep={handleStep} />
                    )}
                    {activeStep === 4 && (
                        <AltaCuentaOrigenPortabilidad onNext={handleNext} handleStep={handleStep} />
                    )}
                    {activeStep === 5 && (
                        <DocumentsProgress onNext={handleNext} documents={altaPortabilidadDocumentos} />
                    )}
                    {activeStep === 6 && (
                        <AltaBanqueroPersonal onNext={handleNext} handleStep={handleStep} />
                    )}
                </Box>
            </Box>
        </AppLayout>
    )
}

export default AltaPortabilidadPage
