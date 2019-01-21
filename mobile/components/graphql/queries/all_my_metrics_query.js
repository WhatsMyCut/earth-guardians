import gql from 'graphql-tag';


export const ALL_MY_METRICS = gql`
 {
  me{
    id
    username
    name
    phone
    crew
    crew_type
    email
    zipcode
    community_events{
        id
        number_of_people
        type
    }
    recent_actions{
        id
        action{
            category{
                name
            }
            id
            points
            carbon_dioxide
            water
            waste
        }
    }
  }
}
`