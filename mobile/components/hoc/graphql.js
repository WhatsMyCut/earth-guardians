import React from 'react';
import { getMainDefinition, getOperationDefinition } from 'apollo-utilities';
import { graphql } from 'react-apollo';
import { withNavigation } from 'react-navigation';
import NavigationService from '../../navigation/navigationService';

export default function(document, operationOptions = {}) {
  const { kind, operation } = getMainDefinition(document);

  if (kind !== 'OperationDefinition' || operation !== 'query') {
    return graphql(document, operationOptions);
  }
  const name = operationOptions.name || 'data';
  return function componentWrapper(Component) {
    @graphql(document, operationOptions)
    @withNavigation
    class GraphqlClass extends React.Component {

      constructor(props){
        super(props);
      }
      state = {
        fetching: false
      };


      render() {
        const data = this.props[name];
        if (data && data.error) {
          console.log('there was an error', data.error);
          return <Component {...this.props}/>;
        }
        return <Component {...this.props}/>;
      }

      
    }

    return GraphqlClass;
  };
}
