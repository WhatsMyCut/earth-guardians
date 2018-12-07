import React from 'react';
import { StoreConsumer } from '../../store/Store';
import Home from './Home';
import PhoneSignup from '../signup/PhoneSignup';

export default class LandingPage extends React.Component {
  render() {
    return (
      <StoreConsumer>
        {value =>
          value.store.authenticated ? (
            <Home {...value} />
          ) : (
            <PhoneSignup {...value} />
          )
        }
      </StoreConsumer>
    );
  }
}
