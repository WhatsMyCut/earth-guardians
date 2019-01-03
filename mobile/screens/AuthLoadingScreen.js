import React from 'react';
import { all } from 'rsvp';

import { StoreConsumer } from '../store/Store';
import LandingPage from '../components/landing-page';

export default class AuthLoading extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <StoreConsumer>
        {value => <LandingPage {...value} {...this.props} />}
      </StoreConsumer>
    );
  }
}
