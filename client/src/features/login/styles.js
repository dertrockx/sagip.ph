import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  div {
    flex: 1;
  }
`;

export const Splash = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.primary};
  position: relative;

  &::after {
    display: block;
    content: '';
    height: 100vh;
    width: 250px;
    background-color: ${({ theme }) => theme.primary};;
    position: absolute;
    right: -125px;
    transform: skew(-15deg);
    z-index: -1;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  padding-left: 30px;
`;

export const LoginButton = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 8px;

  button {
    width: 128px;
  }
`;
