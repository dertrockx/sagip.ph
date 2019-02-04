import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,

  Button,
  TextField,
} from '@components/material-ui';

const ConfirmCode = ({ open, close }) => (
  <Dialog open={open}>
    <DialogTitle>Enter Confirmation Code</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Enter the code sent to your phone number.
      </DialogContentText>
      <TextField
        margin="normal"
        placeholder="Confirmation Code"
        inputProps={{ style: { textAlign: 'center' } }}
        autoFocus
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={close}>Cancel</Button>
      <Button color="primary">Submit</Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmCode;
