import React from 'react';
import { Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo';

export default class BaseScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible:
      navigation.state.params && navigation.state.params.tabBarHidden
        ? false
        : true,
  });

  state = {
    isPortrait: true,
  };

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL)
    .catch(e => console.log(e));
    Dimensions.addEventListener('change', this.orientationChangeHandler);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT)
    .catch(e => console.log(e));
    Dimensions.removeEventListener('change', this.orientationChangeHandler);
  }

  orientationChangeHandler = dims => {
    const { width, height } = dims.window;
    const isLandscape = width > height;
    this.setState({ isPortrait: !isLandscape });
    this.props.navigation.setParams({ tabBarHidden: isLandscape });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL)
    .catch(e => console.log(e));
  };

  switchToLandscape = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  };

  switchToPortrait = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  };
}
