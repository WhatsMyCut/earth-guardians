import React from 'react';

// a store to hold the react context api
const Store = React.createContext();

// create a provide
//create a provider
export class StoreProvider extends React.Component {
  state = {
    isLoading: true,
    authenticated: true,
    user: { number: '', country_dial_code: '' },
  };

  appReady = () => {
    this.setState({ isLoading: false });
  };

  authenticate = navigation => {
    //TODO: make it rigourous
    // for now, turn autheticate to true
    this.setState({ authenticated: true });
    navigation.navigate('Home');
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
