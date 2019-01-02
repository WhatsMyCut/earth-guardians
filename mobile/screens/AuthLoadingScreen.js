import React from 'react';
import { all } from 'rsvp';

// import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
// import graphql from '../components/hoc/graphql';

import { StoreConsumer } from '../store/Store';
import LandingPage from '../components/landing-page';
import { data } from './dummy/actions.json';
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
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
