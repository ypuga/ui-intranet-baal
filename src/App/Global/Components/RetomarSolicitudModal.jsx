import * as React from "react";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

export const RetomarSolicitudModal = ({ open, handleClose, handleStepOne }) => {

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="informative-dialog-title"
      open={open}
      maxWidth="xl"
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{color: "primary.main", p: 1, borderRadius: "4px 4px 0 0" }}
        >
          <Typography variant="h6" component="span" >
            <strong>
              RETOMAR SOLICITUD DE CREDITO
            </strong>
          </Typography>
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon fontSize='large'/>
        </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          mb={3}
          sx={{ border: "1px solid", borderColor: "primary.light", borderRadius: 2, p: 2, bgcolor: "background.default" }}
        >
          <InfoOutlined color="info" fontSize="large" />
          <Typography ml={2} variant="body1" sx={{ fontWeight: 500 }}>
            Este cliente ya tiene una solicitud activa.
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid", borderColor: "grey.300", borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID SOLICITUD</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>NOMBRE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>SUCURSAL</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>BANQUERO PERSONAL</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>PRODUCTO</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>382100292</TableCell>
                <TableCell>YAIR PUGA JIMENEZ</TableCell>
                <TableCell>914</TableCell>
                <TableCell>84540632</TableCell>
                <TableCell>TDC - ALAMEDA MASTER CARD</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{padding: '20px'}}>
        <Button onClick={() => handleStepOne(4)} variant="contained" size="large" color='success' sx={{ borderRadius: 3 }}>
          Retomar solicitud
        </Button>
      </DialogActions>
    </Dialog>
  );
};
