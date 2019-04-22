import React, { Component } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField
} from '@components/material-ui';
import { subscribe } from 'api/sockets';

class Radius extends Component {
  state = { radius: 0 };

  handleRadiusChange = ({ target }) => {
    if (target.value > 0) {
      this.setState({ radius: target.value });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { changeRadius, fetchDistress, onClose, location } = this.props;
    const { radius } = this.state;

    changeRadius(radius);
    fetchDistress({ ...location, radius });
    subscribe({ long: location.lng, lat: location.lat, distance: radius });
    onClose();
  }

  componentDidMount() {
    this.setState({ radius: this.props.radius });
  }

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Change Notification Radius</DialogTitle>
        <DialogContent>
          <DialogContentText>You can change your notification radius to widen or limit the distress that you'll be receiving in real time.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="radius"
            label="Radius in Meters"
            type="number"
            value={this.state.radius}
            onChange={this.handleRadiusChange}
            fullWidth
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Submit</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Radius;