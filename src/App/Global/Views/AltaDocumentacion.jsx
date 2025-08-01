import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, LinearProgress, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IneAnverso from '../../../assets/INE_ANVERSO.png'
import IneReverso from '../../../assets/INE_REVERSO.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { startGetClientDocumentation } from '../../../Store/Prospectos/Thunks';
import useToast from '../../../Hooks/useToast';
import { useLoading } from '../../../Hooks/LoadingContext';

const DocumentsProgress = ({onNext}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [documents, setdocuments] = useState([]);
    const dispatch = useDispatch();
    const {showToast} = useToast();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const {solicitud} = useSelector(state=>state.prospectos);

    useEffect(() => {
        startLoading();
        getDcoumentosCliente(); 
    }, [])

    const getDcoumentosCliente = async () => {
        const resp = await dispatch(startGetClientDocumentation());
        if (resp.status == 200 || resp.status == 'OK') {
            setdocuments(resp.data);
            stopLoading();
        } else {
            showToast(resp.message, 'error', 'top-center');
            stopLoading();
        }
    }
    

    const handleNextStep = () => {
        if (currentStep < documents.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onNext();
        }
    };

    const progressPercentage = Math.round(((currentStep + 1) / documents.length) * 100);

    return (
        <Box
            p={4}
            height="100%"
            display="flex"
            flexDirection="column"
            sx={{ '& .MuiTextField-root': { m: 1 } }}
        >
            <Typography variant="h5" gutterBottom>
                EXPEDIENTE DIGITAL
            </Typography>
            <Typography fontSize={"10px"}>
                ID De Evaluacion: {solicitud.idSolicitud}
            </Typography>
            <Box width="100%" mb={4} mt={5}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Progreso: {progressPercentage}%
                </Typography>
                <LinearProgress variant="determinate" value={progressPercentage} />
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={2}
                width="100%"
                mb={4}
            >
                {documents.map((doc, index) => (
                    <Box
                    key={doc.id || index}
                     sx={{
                        width: '150px',
                        height: '220px',
                        border: '1px solid',
                        borderColor: currentStep >= index ? 'green' : 'grey.400',
                        borderRadius: 2,
                        p: 1,
                        backgroundColor: currentStep >= index ? 'green.50' : 'white',
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            key={doc.id || index}   
                        >
                            {currentStep <= index?
                            <>
                            {doc.title == 'IDENTIFICACION OFICINAL ANVERSO' ?
                            <img src={IneAnverso} style={{width: '80px', height: '50px'}}/>
                            : doc.title == 'IDENTIFICACION OFICINAL REVERSO' ?
                            <img src={IneReverso} style={{width: '80px', height: '50px'}}/>
                            :
                            <InsertDriveFileIcon sx={{ width: '50px', height: '50px', color:'#0c82cf' }} />
                            }
                            </>
                            :
                            <CheckCircleIcon sx={{ width: '50px', height: '50px', color: 'green' }} />
                            }
                            <Box p={1}>
                                <Typography textAlign={"center"} fontSize={"10px"}>{doc.title}</Typography>
                            </Box>
                            {doc.print?
                            <Button fullWidth variant="outlined">
                                <DownloadIcon style={{ marginRight: 8 }} /> DESCARGAR
                            </Button>
                            :null
                            }
                            <hr />
                            {doc.scan?
                            <Button disabled={currentStep != index} fullWidth variant="outlined">
                                <FileUploadIcon style={{ marginRight: 8 }} /> CARGAR
                            </Button>
                            :null
                            }
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin:'20px'
            }}
            >
                <Button color='info' size='large'>Descargar todos los documentos</Button>
            </Box>
            <Button
                variant="contained"
                size="large"
                color="primary"
                disabled={currentStep >= documents.length}
                onClick={handleNextStep}
            >
                {currentStep < documents.length - 1 ? 'SIGUIENTE' : 'FINALIZAR'}
            </Button>
        </Box>
    );
};

export default DocumentsProgress;
