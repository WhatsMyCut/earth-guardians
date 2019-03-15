import gql from 'graphql-tag';


export const CREW_RANKINGS = gql`
{
  getUserRanks{
    id  
    total_points
    crew
    country
    state
    rank
    name
  }
}
`
