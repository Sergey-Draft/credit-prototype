import React from 'react';
import { Backdrop, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MessageModal = ({ open, message, handleClose }) => {
  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#fff',
          color: '#000',
          borderRadius: 2,
          p: 3,
          width: '80%',
          maxWidth: 400,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="body1" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageModal;
