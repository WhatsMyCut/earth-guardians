import React from 'react';
import { StoreConsumer } from '../store/Store';
import Home from './Home';
import PhoneSignup from './PhoneSignup';

export default class LandingPage extends React.Component {
  render() {
    return <StoreConsumer>{value => <PhoneSignup {...value} />}</StoreConsumer>;
  }
}
