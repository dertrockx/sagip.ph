import React, { Component } from 'react';

import { IconButton, Avatar } from '@components/material-ui';
import { Menu as MenuIcon } from '@components/icons';
import { Root, Container, Menu, Profile, Sidebar, MapWrapper } from './styles';

class Dashboard extends Component {
  state = { drawerOpen: true };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };

  render() {
    return (
      <Root>
        <Sidebar
          variant="persistent"
          anchor="left"
          open={this.state.drawerOpen}
        >
          Yo
        </Sidebar>
        <Container open={this.state.drawerOpen}>
          <Menu>
            <IconButton color="inherit" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Menu>
          <Profile>
            <IconButton>
              <Avatar>RS</Avatar>
            </IconButton>
          </Profile>
          <MapWrapper>
            Hello, it's me
          </MapWrapper>
        </Container>
      </Root>
    );
  }
}

export default Dashboard;
