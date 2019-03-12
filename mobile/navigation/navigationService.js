import { NavigationActions } from 'react-navigation';
import { _eventHit } from '../services/googleAnalytics'
import _ from 'lodash'

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}



function navigate(routeName, params) {
  let hitName = routeName.charAt(0,0).toUpperCase() + _.trim(routeName).substr(1,routeName.length)
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
    _eventHit('Navigate', { page: hitName}, res => console.log(res.event, res.params.page))
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
};
