import React from 'react';
import { LinearGradient, AppLoading } from 'expo';
import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
import { styles } from '../constants/Styles';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    pollInterval: 1000,
    variables: {
      name: 'Waste',
    },
  },
})
class WasteStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };

  componentWillUnmount() {
    this.pollInterval = null
  }

  componentDidMount() {
  }

  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.waste} style={[styles.container]}>
          <AppLoading />
        </LinearGradient>
      );
    }

    const actions = all_categories.sectorActionsByName;
    if (!actions[0].video_id && !actions[0].primary_image) {
      <LinearGradient {...LinearGradientProps.waste} style={[styles.container]} />;
    }
    return (
      <LinearGradient {...LinearGradientProps.waste} style={[styles.container]}>
        <GeneralScreen
          data={actions}
          screen={'Waste'}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
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
