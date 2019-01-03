import React from 'react';
import { all } from 'rsvp';
import { LinearGradient, AppLoading } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

import { energy_data, primary_energy_id } from './dummy/data';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
      fetchPolicy: 'network-only',
      variables: {
        name: "Energy"
      }
  }
})
class EnergyStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  async componentDidMount() {
    try {
      // get the data
      const actions = await energy_data();

      // set the primary image and video
      const primary_image = actions[primary_energy_id].image;
      const primary_video = actions[primary_energy_id].video;
      console.log('primary_energy id', primary_energy_id);
      console.log(actions[primary_energy_id].video)

      //update the state
      this.setState({ actions, primary_image, primary_video });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { all_categories } = this.props;
    if(all_categories.loading){
      return <LinearGradient {...LinearGradientProps.energy} style={{ flex: 1 }}>
      <AppLoading
        />
    </LinearGradient>
    }
    console.log('props again', all_categories.actionCategories);
    const actions = all_categories.actionCategories;
    if(!this.state.primary_video && !this.state.primary_image){
      return null;
    }
    return (
      <LinearGradient {...LinearGradientProps.energy} style={{ flex: 1 }}>
        <GeneralScreen
          data={actions}
          screen={'Energy'}
          primary_image={this.state.primary_image}
          primary_video={this.state.primary_video}
        />
      </LinearGradient>
    );
  }
}

EnergyStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.energy.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default EnergyStackScreen;
