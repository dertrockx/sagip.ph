import React from 'react';

import { LoginContainer, LoginButton } from './styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@components/material-ui';

const Login = ({ login, isLoggingIn }) => (
  <LoginContainer>
    <Card
      elevation={4}
      style={{ width: '80%', maxWidth: 540, borderRadius: 8 }}
    >
      <CardContent style={{ padding: 32 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={login}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+63</InputAdornment>
              )
            }}
            fullWidth
          />
          <LoginButton>
            <Button size="large" variant="contained" color="primary" type="submit" disabled={isLoggingIn === 'PENDING'}>
              {isLoggingIn === 'PENDING' ? '...' : 'LOGIN'}
            </Button>
          </LoginButton>
        </form>
      </CardContent>
    </Card>
  </LoginContainer>
);

export default Login;
