import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AppLoading } from 'expo';
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
      name: 'Shopping',
    },
  },
})
class ShoppingStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };

  componentDidMount() {
  }
  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.food} style={[styles.container]}>
          <AppLoading />
        </LinearGradient>
      );
    }

    const actions = all_categories.sectorActionsByName;
    if (!actions[0].video_id && !actions[0].primary_image) {
      return (
        <LinearGradient {...LinearGradientProps.shopping} style={[styles.container]} />
      );
    }
    return (
      <LinearGradient {...LinearGradientProps.shopping} style={[styles.container]}>
        <GeneralScreen
          data={actions}
          screen={'Shopping'}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
        />
      </LinearGradient>
    );
  }
}

ShoppingStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.shopping.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default ShoppingStackScreen;
