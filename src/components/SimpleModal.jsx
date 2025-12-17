import React from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button } from '@mui/material';

const SimpleModal = ({ open, onClose, title, children, maxWidth = 'md' }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth={maxWidth}
    fullWidth
    scroll="paper"
    sx={{
      '& .MuiDialog-paper': {
        borderRadius: '8px',
        padding: '8px',
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
          Х
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {/* <Button color="primary" onClick={onClose} variant="contained">
          Закрыть
        </Button> */}
      </Box>
    </DialogContent>
  </Dialog>
);

export default SimpleModal;
