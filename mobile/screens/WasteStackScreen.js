import React from 'react';
import { all } from 'rsvp';
import { LinearGradient } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
import { waste_data, primary_waste_id } from './dummy/data';

// @graphql(ALL_ACTION_CATEGORIES, {
//   name: 'all_categories',
//   fetchPolicy: 'network-only',
// })
class WasteStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  async componentDidMount() {
    try {
      // get the data
      const actions = await waste_data();

      // set the primary image and video
      const primary_image = actions[primary_waste_id].image;
      const primary_video = actions[primary_waste_id].video;

      //update the state
      this.setState({ actions, primary_image, primary_video });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <LinearGradient {...LinearGradientProps.waste} style={{ flex: 1 }}>
        <GeneralScreen
          data={this.state.actions}
          primary_image={this.state.primary_image}
          primary_video={this.state.primary_video}
        />
      </LinearGradient>
    );
  }
}

WasteStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.waste.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default WasteStackScreen;
