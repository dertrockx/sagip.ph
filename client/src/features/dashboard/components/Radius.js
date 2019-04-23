import React, { Component } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Typography
} from '@components/material-ui';
import { subscribe } from 'api/sockets';

import { FormRow } from '../styles';

class Radius extends Component {
  state = { radius: 0, units: 'km', age: 24 };

  handleInputChange = ({ target }) => {
    if (target.value > 0) {
      this.setState({ [target.name]: target.value });
    }
  }

  handleUnitChange = ({ target }) => {
    const { units, radius } = this.state;

    if (units === 'm' && target.value === 'km') {
      const converted = radius / 1000;
      this.setState({ units: 'km', radius: converted < 1 ? 1 : converted });
    } else if (units === 'km' && target.value === 'm') {
      this.setState({ units: 'm', radius: radius * 1000 });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { changeRadius, fetchDistress, onClose, location } = this.props;
    const { radius, units, age } = this.state;
    const normalizedRadius = radius * (units === 'km' ? 1000 : 1);

    changeRadius(normalizedRadius);
    fetchDistress({ ...location, radius: normalizedRadius, age });
    subscribe({ long: location.lng, lat: location.lat, distance: normalizedRadius, age });
    onClose();
  }

  componentDidMount() {
    this.setState({ radius: this.props.radius / 1000 });
  }

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Change Notification Scope</DialogTitle>
        <DialogContent>
          <DialogContentText>You can change your notification scope to extend or limit the distress that you'll be receiving in real time.</DialogContentText>
          <FormRow>
            <TextField
              autoFocus
              margin="dense"
              id="radius"
              label="Radius"
              type="number"
              value={this.state.radius}
              inputProps={{ name: 'radius' }}
              onChange={this.handleInputChange}
              fullWidth
            />
            <FormControl style={{ width: 160, marginLeft: 16 }}>
              <InputLabel htmlFor="units">Units</InputLabel>
              <Select
                onChange={this.handleUnitChange}
                value={this.state.units}
                inputProps={{ id: 'units', name: 'units' }}
              >
                <MenuItem value="km">Kilometers</MenuItem>
                <MenuItem value="m">Meters</MenuItem>
              </Select>
            </FormControl>
          </FormRow>
          <FormRow>
            <TextField
              margin="dense"
              id="age"
              label="Age"
              type="number"
              value={this.state.age}
              inputProps={{ name: 'age' }}
              onChange={this.handleInputChange}
              fullWidth
            />
            <div style={{ marginLeft: 16, paddingTop: 14 }}>
              <Typography>Hours</Typography>
            </div>
          </FormRow>
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