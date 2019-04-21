import React, { Component, Fragment } from 'react';
import TimeAgo from 'react-timeago';

import {
  List,
  ListItem,
  ListItemText,
} from '@components/material-ui';

const Comments = ({ comments }) => (
  <List>
    {comments.reverse().map(comment => (
      <ListItem key={comment.id}>
        <ListItemText
          primary={
            <span>
              {comment.user.name}
              <span style={{ fontStyle: 'oblique', display: 'inline-block', marginLeft: 8 }}>
                (<TimeAgo date={comment.timestamp} />)
              </span>
            </span>
          }
          secondary={comment.content}
        />
      </ListItem>
    ))}
  </List>
);

export default Comments;
