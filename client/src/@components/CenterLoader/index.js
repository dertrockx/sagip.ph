import React from 'react';

import { CircularProgress } from '@components/material-ui';

const CenterLoader = () => (
  <div style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
    <CircularProgress size={25} thickness={5} />
  </div>
);

export default CenterLoader;
