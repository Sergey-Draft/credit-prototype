import React from 'react';
import { Snackbar, Alert, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LocalSnackbar = ({ open, severity = 'info', message, handleClose }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2000,
    }}
  >
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbar-root': { width: '100%' },
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          width: 350,
          borderRadius: 2,
          boxShadow: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  </Box>
);

export default LocalSnackbar;
