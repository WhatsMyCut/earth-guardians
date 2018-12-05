import React from 'react';

// a store to hold the react context api
const Store = React.createContext();

// create a provide
//create a provider
export class StoreProvider extends React.Component {
  state = {
    isLoading: true,
    authenticated: false,
    test: 'This is a test',
  };

  appReady = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <Store.Provider
        value={{
          store: this.state,
          appReady: this.appReady,
        }}
      >
        {this.props.children}
      </Store.Provider>
    );
  }
}

// for components to access the store
export const StoreConsumer = Store.Consumer;
