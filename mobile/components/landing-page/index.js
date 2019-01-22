import React from 'react';
//import { StoreConsumer } from '../../store/Store';
//import Home from './Home';
import PhoneSignup from '../signup/PhoneSignup';
//import navigationService from '../../navigation/navigationService';
import {RetrieveData, StoreData} from '../../store/AsyncStore';

export default class LandingPage extends React.Component {
  async componentDidMount() {
    const phone = await RetrieveData('phone');
      const country_dial_code = await RetrieveData('country_dial_code');
      const store_data = await RetrieveData('EARTH_GUARDIANS_TOKEN');
      if (phone && country_dial_code && store_data) {
        this.props.navigation.navigate('CommunityStack');
      } else {
        await StoreData('phone', null);
        await StoreData('country_dial_code', null);
        await StoreData('EARTH_GUARDIANS_TOKEN', null);
        this.props.navigation.navigate('AuthLoading');
      }
    if (this.props.store.authenticated) {
      
    }
  }
  render() {
    return <PhoneSignup {...this.props} />;
  }
}
