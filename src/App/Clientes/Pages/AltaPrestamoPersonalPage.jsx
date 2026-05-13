import AppLayout from "../../Layout/AppLayout.jsx";
import {Box} from "@mui/system";
import StepperComponent from "../../Global/Components/StepperAltaClienteComponent.jsx";
import {tdcSteps} from "../../../Data/Steps.js";
import React, {useState} from "react";

const AltaPrestamoPersonalPage = () => {

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
        </Box>
    </AppLayout>
}

export default AltaPrestamoPersonalPage
