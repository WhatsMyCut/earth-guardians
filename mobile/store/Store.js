import React from 'react';
import navigationService from '../navigation/navigationService';
import { StoreData, RetrieveData } from './AsyncStore';

// a store to hold the react context api
const Store = React.createContext();

// create a provide
//create a provider
export class StoreProvider extends React.Component {
  state = {
    isLoading: true,
    authenticated: false,
    user: { number: '', country_dial_code: '' },
  };

  async componentDidMount() {
    try {
      // check if async storage has the data
      // await StoreData('phone', null);
      // await StoreData('country_dial_code', null);
      // await StoreData('EARTH_GUARDIANS_TOKEN', null);

      const phone = await RetrieveData('phone');
      const country_dial_code = await RetrieveData('country_dial_code');
      if (phone && country_dial_code) {
        const user = { phone, country_dial_code };
        this.setState({
          authenticated: true,
          user,
        });
        navigationService.navigate('MyActions', {});
      }
    } catch (e) {
      console.log(e);
    }
  }
  appReady = () => {
    this.setState({ isLoading: false });
  };

  authenticate = async details => {
    const new_user = {
      phone: details.phone,
      country_dial_code: details.dialCode,
      token:details.token
    };

    try {
      // store to local storage
      await StoreData('phone', details.phone);
      await StoreData('country_dial_code', details.dialCode);
    } catch (e) {
      console.log(e);
    }
    // for now, turn autheticate to true
    StoreData('EARTH_GUARDIANS_TOKEN', details.token);
    console.log('details token', details.token);
    this.setState({ authenticated: true, user: new_user });
    navigationService.navigate('MyActions', {});
  };

  updatePhone = phone => {
    // TODO: check if there is proper incoming info
    if (phone.number && phone.country_dial_code) {
      // make a copy of the current user
      const update_user = { ...this.state.user };

      // update user object
      update_user.number = phone.number;
      update_user.country_dial_code = phone.country_dial_code;

      // update state
      this.setState({ user: update_user });
    }
  };

  render() {
    return (
      <Store.Provider
        value={{
          store: this.state,
          appReady: this.appReady,
          authenticate: this.authenticate,
          updatePhone: this.updatePhone,
        }}
      >
        {this.props.children}
      </Store.Provider>
    );
  }
}

// for components to access the store
export const StoreConsumer = Store.Consumer;
