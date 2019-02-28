import gql from 'graphql-tag';


export const CREW_RANKINGS = gql`
{
  getUserRanks{
    total_points
    crew
    country
    rank
      name
  }
}
`
