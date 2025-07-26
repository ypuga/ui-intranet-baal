import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { startGetTramites } from '../../../Store/Front/Thunks';
import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const TramitesComponents = () => {
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        obtenerTramites();
    }, [])

    const obtenerTramites = async () => {
        const resp = await dispatch(startGetTramites());
        if (resp?.status === 200 || resp?.status === 'OK') {
            setdata(resp?.data || []);
        }
        setisLoading(false);
    }

    return (
        <Box sx={{ width: '100%', p: 3, bgcolor: '#fafafa' }}>
            <Typography variant='h6'>Tramites Activos</Typography>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%"/>
            ) : (
                <TableContainer sx={{ boxShadow: 'none', borderRadius: 1 }}>
                    <Table
                        sx={{
                            borderCollapse: 'separate',
                            borderSpacing: '0 10px',
                            bgcolor: 'transparent',
                        }}
                        aria-label="minimalist table"
                    >
                        <TableHead>
                            <TableRow>
                                {['Fecha', 'ID Solicitud', 'Producto', 'Nombre del Prospecto', 'Teléfono', 'Estatus'].map((headCell) => (
                                    <TableCell
                                        key={headCell}
                                        sx={{
                                            fontWeight: '600',
                                            color: '#555',
                                            borderBottom: 'none',
                                            pb: 1,
                                            fontSize: 14,
                                            textTransform: 'uppercase',
                                            letterSpacing: 0.5,
                                        }}
                                    >
                                        {headCell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? (
                                data.map((sol, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            bgcolor: 'white',
                                            borderRadius: 2,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            '&:last-child td': { borderBottom: 0 },
                                            '& td': { borderBottom: 'none', fontSize: 14, color: '#333' },
                                            '&:hover': { bgcolor: '#f5f7fa' },
                                        }}
                                    >
                                        <TableCell>{new Date(sol?.fechaSolicitud).toLocaleDateString('es-ES')}</TableCell>
                                        <TableCell>{sol?.idSolicitud}</TableCell>
                                        <TableCell>{sol?.nombreProducto}</TableCell>
                                        <TableCell>{sol?.nombreCompleto}</TableCell>
                                        <TableCell>{sol?.telefono || 'No proporcionado'}</TableCell>
                                        <TableCell>{sol?.status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: '#999', fontStyle: 'italic' }}>
                                        No hay información disponible por el momento.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    )
}

export default TramitesComponents;
