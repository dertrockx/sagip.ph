import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import 'assets/font/proxima-nova.css';
import 'stylesheets/_index.scss';

import fail from 'assets/icons/cancel.svg';

class Error extends Component {
  handleExit = () => {
    window.close();
  }

  render() {
    return (
      <div className="container-emphasis">
        <Helmet><title>Error · sagip.ph</title></Helmet>
        <div className="container container-padded container-emphasis message">
          <div className="message-main">
            <img className="icon" src={fail} alt=""/>
            <h1 className="heading-h1 heading-centered">
              An Error Occured
            </h1>
          </div>
          <div className="message-action">
            <button className="submit exit" onClick={this.handleExit}>Back to Application</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;