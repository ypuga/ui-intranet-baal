import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startGetSolicitudes } from '../../../Store/Front/Thunks';

const SolicitudesComponent = () => {
    const dispatch = useDispatch();
    const [solicitudesData, setSolicitudesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const obtenerSolicitudes = async () => {
        const resp = await dispatch(startGetSolicitudes());
        if (resp.status === 200 || resp.status === 'OK') {
            setSolicitudesData(resp?.data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        obtenerSolicitudes();
    }, []);

    return (
        <Box sx={{ width: '100%', p: 3, bgcolor: '#ccd1d1' }}>
            <Typography variant='h6' color='#5f6a6a'>Solicitudes activas</Typography>
            <br/>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" />
            ) : (
                <TableContainer
                    sx={{
                        borderRadius: 2,
                    }}
                >
                    <Table
                        sx={{
                            minWidth: 650,
                            borderCollapse: 'separate',
                            borderSpacing: '0 12px',
                            color: '#e5e8e8',
                        }}
                        size="small"
                        aria-label="dark-themed solicitudes table"
                    >
                        <TableHead>
                            <TableRow>
                                {['Fecha', 'Producto', 'Nombre del Prospecto', 'Teléfono'].map((headCell) => (
                                    <TableCell
                                        key={headCell}
                                        sx={{
                                            color: 'black',
                                            fontWeight: 600,
                                            borderBottom: 'none',
                                            fontSize: 14,
                                            textTransform: 'uppercase',
                                            letterSpacing: 1,
                                            bgcolor: '#a6acaf',
                                        }}
                                    >
                                        {headCell}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {solicitudesData.length > 0 ? (
                                solicitudesData.map((sol, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            bgcolor: '#eaeded',
                                            borderRadius: 2,
                                            '& td': { borderBottom: 'none', color: '#a6acaf', fontSize: 14 },
                                            '&:hover': { bgcolor: '#f2f4f4' },
                                        }}
                                    >
                                        <TableCell>{new Date(sol?.fechaSolicitud).toLocaleDateString('es-ES')}</TableCell>
                                        <TableCell>{sol?.nombreProducto}</TableCell>
                                        <TableCell>{sol?.nombreCompleto}</TableCell>
                                        <TableCell>{sol?.telefono || 'No proporcionado'}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#888', fontStyle: 'italic' }}>
                                        No hay información disponible por el momento.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default SolicitudesComponent;
