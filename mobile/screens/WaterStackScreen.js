import React from 'react';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
import { water_data, primary_water_id } from './dummy/data';
// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class WaterStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  async componentDidMount() {
    try {
      // get the data
      const actions = await water_data();

      // set the primary image and video
      const primary_image = actions[primary_water_id].image;
      const primary_video = actions[primary_water_id].video;

      //update the state
      this.setState({ actions, primary_image, primary_video });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <LinearGradient {...LinearGradientProps.water} style={{ flex: 1 }}>
        <GeneralScreen
          data={this.state.actions}
          primary_image={this.state.primary_image}
          primary_video={this.state.primary_video}
        />
      </LinearGradient>
    );
  }
}

WaterStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.water.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default WaterStackScreen;
