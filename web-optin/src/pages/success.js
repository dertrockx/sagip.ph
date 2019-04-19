import React, { Component } from 'react';

import success from 'assets/icons/verified.svg';

class Success extends Component {
  handleExit = () => {
    window.close();
  }

  render() {
    return (
      <div className="container-emphasis">
        <div className="container container-padded container-emphasis message">
          <div className="message-main">
            <img className="icon" src={success} alt=""/>
            <h1 className="heading-h1 heading-centered">
              Successfully Registered
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

export default Success;