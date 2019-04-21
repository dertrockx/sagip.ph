import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import {
  IconButton,
  Avatar,
  Menu as PopMenu,
  MenuItem,

  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,

  Switch,
} from '@components/material-ui';

import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  TripOrigin as TripOriginIcon,
  ChevronRight as ChevronRightIcon,
} from '@components/icons';

import Radius from './components/Radius';
import Distress from './components/Distress';

import { inject, observer } from 'mobx-react';
import { Root, Container, Menu, Profile, Sidebar, MapWrapper } from './styles';

class Dashboard extends Component {
  state = {
    drawerOpen: false,
    menuAchor: null,
  };

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };

  toggleMenu = ({ currentTarget }) => {
    this.setState({
      menuAnchor: this.state.menuAnchor ? null : currentTarget,
    });
  }

  componentDidMount() {
    const { dashboard, map } = this.props.store;
    const { radius } = dashboard;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;

        dashboard.updateLocation({ lat, lng });
        map.fetchDistress({ lat, lng, radius });
      });
    }
  }

  render() {
    const { drawerOpen, menuAnchor } = this.state;
    const { auth, dashboard, map } = this.props.store;
    
    return (
      <Root>
        <Helmet><title>Dashboard · sagip.ph</title></Helmet>
        <Sidebar
          variant="persistent"
          anchor="left"
          open={drawerOpen}
        >
          <List subheader={<ListSubheader>Settings</ListSubheader>}>
            <ListItem>
              <ListItemIcon><NotificationsIcon /></ListItemIcon>
              <ListItemText primary="Notifications" />
              <ListItemSecondaryAction>
                <Switch checked={false} />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem onClick={dashboard.toggleRadiusModal} button>
              <ListItemIcon><TripOriginIcon /></ListItemIcon>
              <ListItemText primary="Radius" />
              <ListItemSecondaryAction>
                <ChevronRightIcon />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Sidebar>
        <Container open={drawerOpen}>
          <Menu>
            <IconButton color="inherit" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Menu>
          <Profile>
            <IconButton onClick={this.toggleMenu}>
              <Avatar>RS</Avatar>
            </IconButton>
            <PopMenu anchorEl={menuAnchor} open={!!menuAnchor} onClose={this.toggleMenu}>
              <MenuItem onClick={this.toggleMenu}>Account Settings</MenuItem>
              <MenuItem onClick={auth.logout}>Logout</MenuItem>
            </PopMenu>
          </Profile>
          <MapWrapper>
            {this.props.children}
          </MapWrapper>
        </Container>
        <Radius
          open={dashboard.status.isRadiusOpen}
          onClose={dashboard.toggleRadiusModal}
          radius={dashboard.radius}
          changeRadius={dashboard.changeRadius}
          fetchDistress={map.fetchDistress}
          location={dashboard.location}
        />
        <Distress
          open={dashboard.status.isDistressOpen}
          onClose={dashboard.toggleDistressModal}
          activeDistress={dashboard.activeDistress}
          commentToDistress={map.commentToDistress}
          isAddingComment={map.status.addComment === 'PENDING'}
          isGettingComments={map.status.getComment === 'PENDING'}
          comments={map.comments}
        />
      </Root>
    );
  }
}

export default inject('store')(observer(Dashboard));
