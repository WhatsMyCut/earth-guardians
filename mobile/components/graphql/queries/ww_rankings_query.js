import gql from 'graphql-tag';


export const WW_RANKINGS = gql`
{
    getCountryStats{
      country
      points
    }
  }
`
