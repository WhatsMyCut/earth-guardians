import gql from 'graphql-tag';


export const MY_ACTIONS_QUERY = gql`
{
  myAvailableActions{
  id
    action{
      id
      primary_image
      action_taken_description
      carbon_dioxide
      carbon_community
      water_community
      waste_community
      water
      waste
      schedule
    }
   createdAt
  }
  
}
`


