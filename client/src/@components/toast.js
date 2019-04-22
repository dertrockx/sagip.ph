import React from 'react';
import ButterToast, { Cinnamon } from 'butter-toast'
import { Warning, Info, Done } from '@components/icons';

const Toast = ({ title, content = 'An error occured', type = 'normal' }) => {
  let theme, icon;

  switch (type) {
    case 'error':
      theme = Cinnamon.Crisp.SCHEME_RED;
      icon = <Warning />;
      break;
    case 'success':
      theme = Cinnamon.Crisp.SCHEME_GREEN;
      icon = <Done />;
      break;
    default:
      theme = Cinnamon.Crisp.SCHEME_GREY;
      icon = <Info />;
  }

  ButterToast.raise({
    content: <Cinnamon.Crisp
      scheme={theme}
      title={title}
      icon={icon}
      content={() => (
        <div>{content}</div>
      )}
    />
  });
}

export default Toast;
