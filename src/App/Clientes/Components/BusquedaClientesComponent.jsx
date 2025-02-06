import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { criteriosBusquedaClientes } from '../../../Data/SucursalesData'
import { useLoading } from '../../../Hooks/LoadingContext';

export const BusquedaClientesComponent = () => {

    const [criterio, setcriterio] = useState('');

    const { isLoading, startLoading, stopLoading } = useLoading();

    const handleBuscarCliente = () => {
        startLoading();
    }

    return (
        <Box sx={{
            width: '100'
        }}>
            <Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Buscar cliente por:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group">
                        {criteriosBusquedaClientes.map((criterio, index) => (
                            <FormControlLabel 
                            sx={{marginLeft: '10px'}}
                            key={index} 
                            value={criterio.value} 
                            control={<Radio />} 
                            label={criterio.label}
                            onClick={()=>setcriterio(criterio)} 
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
            {(criterio != '')?
            <Box>
            <Divider/>
            <Box sx={{marginTop: '10px', padding: '10px', maxWidth: '300px'}}>
                <TextField 
                id={criterio.value} 
                label={criterio.label} 
                inputProps={{
                    maxLength: criterio.maxLength,
                    onInput: (e) => {
                        e.target.value = e.target.value.toUpperCase();
                        
                    },
                }}
                type={criterio.value == 'ID_CLIENTE_UNICO' ? 'number' : 'text'}
                variant="standard"  
                fullWidth/>
            </Box>
                <Box sx={{maxWidth: '300px', display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant='text' onClick={handleBuscarCliente}>Buscar</Button>
                </Box>
            </Box>
            :null
            }
        </Box>
    )
}
