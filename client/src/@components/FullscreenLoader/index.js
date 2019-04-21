import React from 'react';
import styled from 'styled-components';

import { CircularProgress } from '@components/material-ui';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullscreenLoader = ({ inverted = false }) => (
  <Wrapper>
    <CircularProgress style={inverted ? { color: 'white' } : {}}/>
  </Wrapper>
);

export default FullscreenLoader;
