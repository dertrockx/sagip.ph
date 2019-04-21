import React, { Component, Fragment } from 'react';
import TimeAgo from 'react-timeago';

import { CenterLoader } from '@components';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from '@components/material-ui';

import Comments from './Comments';

class Distress extends Component {
  state = { comment: '' };

  handleChange = ({ target }) => {
    this.setState({
      comment: target.value,
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { activeDistress, commentToDistress } = this.props;
    commentToDistress(activeDistress.id, { content: this.state.comment });
    this.setState({ comment: '' });
  }

  render() {
    const {
      open,
      onClose,
      activeDistress,
      isGettingComments,
      isAddingComment,
      comments,
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
          {isGettingComments
            ? <CenterLoader />
            : <Comments comments={comments} />
          }
          <TextField
            autoFocus
            margin="dense"
            label="Add Comment"
            type="text"
            value={this.state.comment}
            onChange={this.handleChange}
            disabled={isAddingComment}
            multiline
            fullWidth
          />
          <Button
            color="primary"
            disabled={this.state.comment.length === 0 || isAddingComment}
            onClick={this.handleSubmit}
          >
            Add Comment
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Distress;
