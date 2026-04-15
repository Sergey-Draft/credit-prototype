import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SimpleModal = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = true,
  sx = {},
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
    scroll="paper"
    sx={{
      '& .MuiDialog-paper': {
        borderRadius: '8px',
        padding: '8px',
        ...sx,
      },
    }}
  >
    {title && (
      <DialogTitle
        sx={{
          borderBottom: '1px solid #eee',
          color: '#404E67',
          fontWeight: 600,
          fontSize: '1.1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{title}</span>
        <span onClick={onClose} style={{ cursor: 'pointer' }}>
          <CloseIcon />
        </span>
      </DialogTitle>
    )}

    <DialogContent>
      <Box
        sx={{
          maxHeight: 500,
          overflowY: 'auto',
          p: 1,
        }}
      >
        {children}
      </Box>
    </DialogContent>
  </Dialog>
);

export default SimpleModal;
