import React from 'react';
import { StoreConsumer } from '../../store/Store';
import Home from './Home';
import PhoneSignup from '../signup/PhoneSignup';

export default class LandingPage extends React.Component {
  componentDidMount() {
    if (this.props.store.authenticated) {
      this.props.navigation.navigate('Home');
    }
  }
  render() {
    return <PhoneSignup {...this.props} />;
  }
}
