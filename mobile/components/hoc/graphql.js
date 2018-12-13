import { getMainDefinition } from 'apollo-utilities';
import { graphql } from 'react-apollo';

export default function(document, operationOptions = {}) {
  const { kind, operation } = getMainDefinition(document);

  if (kind !== 'OperationDefinition' || operation !== 'query') {
    return graphql(document, operationOptions);
  }
  const name = operationOptions.name || 'data';
  return function componentWrapper(Component) {
    @graphql(document, operationOptions)
    class GraphqlClass extends React.Component {

      state = {
        fetching: false
      };


      render() {
        const data = this.props[name];

        if (data && data.error) {
          return console.error('There was an Error', data.error);
        }

        return <Component {...this.props} />;
      }

      
    }

    return GraphqlClass;
  };
}
