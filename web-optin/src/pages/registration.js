import React, { Component } from 'react';
import { Input } from '@common';

import 'stylesheets/_index.scss';

class Registration extends Component {
  render() {
    return (
      <div className="container container-padded">
        <h1 className="heading-1 heading-gutter-bottom">Continue Registration</h1>
        <p className="typography-sub">To continue with your registration, please fill out all the necessary details below.</p>

        <form className="registration" method="POST">
          <div className="fields">
            <Input type="text" placeholder="Juan Dela Cruz" label="Name" required />
            <Input type="date" label="Birthdate" required />
            <Input type="text" label="Affiliation" placeholder="N/A"/>
            <Input type="select" label="Profession" required />
          </div>

          <button className="submit" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
