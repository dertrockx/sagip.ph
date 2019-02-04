import React, { Component } from 'react';

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

  render() {
    return (
      <Container>
        <Splash />
        <LoginForm />
        <ConfirmCode
          open={this.state.confirmationModal}
          close={this.toggleConfirmationModal}
        />
      </Container>
    );
  }
}

export default Login;
