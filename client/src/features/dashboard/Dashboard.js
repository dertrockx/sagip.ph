import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';

import {
  IconButton,
  Avatar,
  Menu as PopMenu,
  MenuItem,
} from '@components/material-ui';

import {
  Settings as SettingsIcon,
} from '@components/icons';

import { subscribe, attachListener } from 'api/sockets';
import Radius from './components/Radius';
import Distress from './components/Distress';

import { Root, Container, Menu, Profile, MapWrapper } from './styles';

class Dashboard extends Component {
  state = {
    menuAchor: null,
    isLocationBlocked: false,
  };

  toggleMenu = ({ currentTarget }) => {
    this.setState({
      menuAnchor: this.state.menuAnchor ? null : currentTarget,
    });
  }

  componentDidMount() {
    const { dashboard, map } = this.props.store;
    const { radius } = dashboard;

    // Request permission for notification
    if (window.Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;

        dashboard.updateLocation({ lat, lng });
        map.fetchDistress({ lat, lng, radius });

        subscribe({ long: lng, lat, distance: radius });
        attachListener(map.updateDistress);
      }, () => dashboard.setLocationTrackingBlocked(), {
        maximumAge: 10000,
        enableHighAccuracy: true
      });
    }
  }

  render() {
    const { drawerOpen, menuAnchor } = this.state;
    const { auth, dashboard, map } = this.props.store;
    
    return (
      <Root>
        <Helmet><title>Dashboard · sagip.ph</title></Helmet>
        <Container open={drawerOpen}>
          <Menu>
            <IconButton color="inherit" onClick={dashboard.toggleRadiusModal}>
              <SettingsIcon />
            </IconButton>
          </Menu>
          <Profile>
            <IconButton onClick={this.toggleMenu}>
              <Avatar>{auth.user.name[0]}</Avatar>
            </IconButton>
            <PopMenu anchorEl={menuAnchor} open={!!menuAnchor} onClose={this.toggleMenu}>
              <MenuItem onClick={dashboard.toggleRadiusModal}>Distress Settings</MenuItem>
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
