import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import LoginForm from './LoginForm';
import { ConfirmCode } from '@components';
import { Container, Splash } from './styles';

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
        <Splash />
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
