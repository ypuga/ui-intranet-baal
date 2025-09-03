import { Box, Divider, Grid2, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppLayout from '../../Layout/AppLayout'
import ClienteCarteraComponent from '../Components/ClienteCarteraComponent'
import { useDispatch } from 'react-redux'
import { startGetCarteraClientes } from '../../../Store/Datos/Thunks'
import useToast from '../../../Hooks/useToast'
import { useLoading } from '../../../Hooks/LoadingContext'
import FilterCarteraComponents from '../Components/FilterCarteraComponents'
import ProductosClienteModal from '../Components/ProductosClienteModal'
import { startObtenerClienteInfo, startObtenerCuentasYCreditosDelCliente, startObtenerOfertasClientes } from '../../../Store/Clientes/Thunks'
import ClienteOfertasModal from '../Components/ClienteOfertasModal'

const CarteraPage = () => {
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const [clientesData, setclientesData] = useState([]);
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [filtros, setFiltros] = useState({ tipo: 'nombre', valor: '' });
    const [open, setOpen] = useState(false);
    const [openOfertas, setOpenOfertas] = useState(false);
    const [ofertasData, setofertasData] = useState([]);
    const [informacionContacto, setinformacionContacto] = useState();


    useEffect(() => {
        startLoading();
        getCartera();
    }, []);

    const getCartera = async () => {
        const resp = await dispatch(startGetCarteraClientes());
        if (resp.status == 200 || resp.status == 'OK') {
            setclientesData(resp?.data || []);
            stopLoading();
        } else {
            showToast(resp.message, 'error', 'top-center');
            stopLoading();
        }
    }

    const clientesFiltrados = clientesData.filter(cliente => {
        if (!filtros.valor) return true;

        const valor = filtros.valor.toLowerCase();

        switch (filtros.tipo) {
            case 'nombre':
                const nombreCompleto = `${cliente.primerNombre || ''} ${cliente.segundoNombre || ''} ${cliente.apellidoPaterno || ''} ${cliente.apellidoMaterno || ''}`.toLowerCase();
                return nombreCompleto.includes(valor);

            case 'id':
                return cliente.idClienteUnico?.toString().includes(valor);

            case 'ofertas':
                return cliente.ofertasFlag === (valor === 'true');

            default:
                return true;
        }
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseCliente = () => {
        setOpenOfertas(false);
    };

    const handleOpen = async (idClienteUnico) => {
        startLoading();
        const resp = await dispatch(startObtenerCuentasYCreditosDelCliente(idClienteUnico));
        if (resp?.status == 'OK' || resp.status == 200) {
            setOpen(true);
        } else {
            showToast(resp?.message, 'error', 'top-center');
        }
        stopLoading();
    };

    const handleOpenOfertas = async (idClienteUnico) => {
        startLoading();
        const resp = await dispatch(startObtenerOfertasClientes(idClienteUnico));
        if (resp?.status == 'OK' || resp.status == 200) {
            const contacto = await dispatch(startObtenerClienteInfo('ID_CLIENTE_UNICO', idClienteUnico, 'CONTACTO'));
            if (contacto?.status == 'OK' || contacto?.status == 200) {
                setinformacionContacto(contacto?.data);
                setofertasData(resp?.data);
                setOpenOfertas(true);
            }
        } else {
            showToast(resp?.message, 'error', 'top-center');
        }
        stopLoading();
    };



    return (
        <AppLayout>
            <ProductosClienteModal
                open={open}
                handleClose={() => handleClose()}
            />
            <ClienteOfertasModal
                open={openOfertas}
                handleClose={() => handleCloseCliente()}
                ofertasData={ofertasData}
                informacionContacto={informacionContacto}
            />
            <Typography component='h1' sx={{ fontSize: 'xx-large' }}>Cartera del ejecutivo</Typography>
            <Divider />
            <Box sx={{ width: '100%', marginTop: '10px' }}>
                <FilterCarteraComponents onFilterChange={setFiltros} />
            </Box>
            {clientesFiltrados.length > 0 ? (
                <Box sx={{ marginTop: '20px' }}>
                    <Grid2 container spacing={3}>
                        {clientesFiltrados.map((cliente, index) => (
                            <Grid2
                                key={index}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={2.4}
                            >
                                <ClienteCarteraComponent cliente={cliente} handleOpen={(idClienteUnico) => handleOpen(idClienteUnico)} handleOpenOfertas={(idClienteUnico) => handleOpenOfertas(idClienteUnico)} />
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            ) : (
                <>
                    <br />
                    <Typography>No hay información disponible por el momento!!!</Typography>
                </>
            )}
        </AppLayout>
    );
};


export default CarteraPage
