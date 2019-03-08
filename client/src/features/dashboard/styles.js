import styled from 'styled-components';

import { Drawer } from '@components/material-ui';

const spacing = {
  margin: 15,
}

export const Root = styled.div`
  display: flex;
`;

export const Container = styled.div`
  height: 100vh;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.gray};
  color: white;
  position: relative;
  overflow: hidden;
  margin-left: ${props => props.open ? '0px' : '-280px'};
  transition: margin 225ms cubic-bezier(0.0, 0, 0.2, 1);
`;

export const Menu = styled.div`
  position: absolute;
  top: ${spacing.margin}px;
  left: ${spacing.margin}px;
  z-index: 2;
`;

export const Profile = styled.div`
  position: absolute;
  top: ${spacing.margin - 4}px;
  right: ${spacing.margin - 4}px;
  z-index: 2;

  & > div {
    padding: 8px;
  }
`;

export const Sidebar = styled(Drawer)`
  width: 280px;
  flex-shrink: 0;

  .MuiPaper-root-13 {
    width: 280px;
  }
`;

export const MapWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  position: absolute;
`;
