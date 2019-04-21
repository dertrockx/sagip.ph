import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import LoginForm from './LoginForm';
import { ConfirmCode } from '@components';
import { Typography } from '@components/material-ui';
import { Container, Splash } from './styles';

import logo from 'assets/logo.png';

class Login extends Component {
  state = {
    confirmationModal: false,
  };

  toggleConfirmationModal = () => {
    this.setState(prev => ({ confirmationModal: !prev.confirmationModal }));
  }

  handleLogin = e => {
    e.preventDefault();

    const { value } = e.target.phoneNumber;
    this.props.store.auth.login({ phoneNumber: value });
  }

  render() {
    const { auth } = this.props.store;

    return (
      <Container>
        <Helmet><title>sagip.ph · Connecting people during disasters</title></Helmet>
        <Splash>
          <img src={logo} alt="" height="196" width="196" />
          <Typography variant="h2" style={{ fontWeight: 'bold', color: 'white' }}>sagip.ph</Typography>
          <Typography variant="h5" style={{ color: 'white', marginTop: 16, textAlign: 'center' }}>
            Connecting people during disasters
          </Typography>
        </Splash>
        <LoginForm login={this.handleLogin} isLoggingIn={auth.status.login} />
        <ConfirmCode
          open={auth.status.confirmationModalOpen}
          close={auth.toggleConfirmationModal}
          callback={auth.confirmUserLogin}
          isLoading={auth.status.confirm === 'PENDING'}
        />
      </Container>
    );
  }
}

export default inject('store')(observer(Login));
