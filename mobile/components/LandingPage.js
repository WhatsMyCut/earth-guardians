import React from 'react';
import { StoreConsumer } from '../store/Store';
import Home from './Home';
import PhoneSignup from './PhoneSignup';
import Test from './Test';

export default class LandingPage extends React.Component {
  render() {
    return <StoreConsumer>{value => <Test {...value} />}</StoreConsumer>;
  }
}
