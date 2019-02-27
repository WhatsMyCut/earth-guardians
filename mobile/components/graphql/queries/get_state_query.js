import gql from 'graphql-tag';


export const STATE_RANKINGS = gql`
{
    getStateStats{
      points
      state
    }
  }
`