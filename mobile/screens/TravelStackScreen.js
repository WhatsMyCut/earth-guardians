import React from 'react';
import { all } from 'rsvp';
import { LinearGradient, AppLoading } from 'expo';

import { Analytics, PageHit } from 'expo-analytics';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

import { travel_data, primary_travel_id } from './dummy/data';
@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    pollInterval: 1000,
    variables: {
      name: 'Travel',
    },
  },
})
class TravelStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  async componentDidMount() {
    try {
      // get the data
      const actions = await travel_data();

      // set the primary image and video
      const primary_image = actions[primary_travel_id].image;
      const primary_video = actions[primary_travel_id].video;

      //update the state
      this.setState(
        { actions, primary_image, primary_video },
        // Analytics
        () => {
          try {
            const analytics = new Analytics('UA-131896215-1');
            analytics
              .hit(new PageHit('TravelScreen'))
              .then(() => console.log('success '))
              .catch(e => console.log(e.message));
          } catch (e) {
            console.log(e);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { all_categories } = this.props;

    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.travel} style={{ flex: 1 }}>
          <AppLoading />
        </LinearGradient>
      );
    }
    const actions = all_categories.sectorActionsByName;
    if (!this.state.primary_video && !this.state.primary_image) {
      return (
        <LinearGradient {...LinearGradientProps.travel} style={{ flex: 1 }} />
      );
    }
    return (
      <LinearGradient {...LinearGradientProps.travel} style={{ flex: 1 }}>
        <GeneralScreen
          data={actions}
          screen={'Travel'}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
          openZipCodeModal={this.props.openModal}
          onModalClose={this.props.closeModal}
        />
      </LinearGradient>
    );
  }
}

TravelStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.travel.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default TravelStackScreen;
