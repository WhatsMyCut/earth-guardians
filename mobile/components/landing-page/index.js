import React from 'react';
//import { StoreConsumer } from '../../store/Store';
//import Home from './Home';
import PhoneSignup from '../signup/PhoneSignup';
//import navigationService from '../../navigation/navigationService';

export default class LandingPage extends React.Component {
  componentDidMount() {
    if (this.props.store.authenticated) {
      this.props.navigation.navigate('MyActions');
    }
  }
  render() {
    return <PhoneSignup {...this.props} />;
  }
}
