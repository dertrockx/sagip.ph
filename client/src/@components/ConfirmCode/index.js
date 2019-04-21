import React, { Component } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,

  Button,
  TextField,
} from '@components/material-ui';

class ConfirmCode extends Component {
  state = { code: '' };

  handleCodeChange = e => {
    this.setState({
      code: e.target.value.slice(0, this.props.limit || 6).toUpperCase(),
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.callback({ code: this.state.code });
  }

  render() {
    const { open, close, isLoading } = this.props;

    return (
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
            onChange={this.handleCodeChange}
            value={this.state.code}
            disabled={isLoading}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} disabled={isLoading}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary" disabled={isLoading}>Submit</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmCode;
