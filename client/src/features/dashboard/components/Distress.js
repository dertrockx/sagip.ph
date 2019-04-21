import React, { Component, Fragment } from 'react';
import TimeAgo from 'react-timeago';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField
} from '@components/material-ui';

class Distress extends Component {
  render() {
    const {
      open,
      onClose,
      activeDistress,
    } = this.props;

    const {
      nature = '',
      user = {},
      latitude,
      longitude,
      distance,
      description,
      timestamp
    } = activeDistress || {};
    const formattedNature = `${nature ? nature[0].toUpperCase() : ''}${nature.slice(1)}`;

    return (
      <Dialog open={open} onClose={onClose} scroll="paper">
        <DialogTitle>{formattedNature} Distress from {user.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span style={{ fontStyle: 'oblique' }}>
              Sent <TimeAgo date={timestamp}/>
            </span>
            <br/>
            <br/>
            <b>Latitude:</b> {latitude}
            <br/>
            <b>Longitude:</b> {longitude}
            <br/>
            <b>Distance:</b> {distance} kilometers
            {description && (
              <Fragment>
                <br/>
                <span><b>Description:</b> {description}</span>
              </Fragment>
            )}
            <br/>
            <b>Contact Number:</b> 0{user.phoneNumber}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Distress;
