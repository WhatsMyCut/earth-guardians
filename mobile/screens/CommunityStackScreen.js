import React from 'react';
import { all } from 'rsvp';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import GeneralScreen from './GeneralScreen';

import { data } from './dummy/actions.json';
@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  fetchPolicy: 'network-only',
})
class CommunityStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  componentDidMount() {
    const actions = data[0].actions;
    const primary_image = data[0].primary.image;
    const primary_video = data[0].primary.video_url;

    this.setState({ actions, primary_image, primary_video });
  }

  render() {
    return (
      <GeneralScreen
        data={this.state.actions}
        primary_image={this.state.primary_image}
        primary_video={this.state.primary_video}
      />
    );
  }
}

CommunityStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: '#aaa',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default CommunityStackScreen;
