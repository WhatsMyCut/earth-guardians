import gql from 'graphql-tag';


export const GET_USER = gql`
 {
  me{
    id
    phone
    name
    email
    username
    token
    crew
    crew_type
    zipcode
    photo
    push_notifications_enabled
    action_reminders
    new_highlights_notification
    new_features_notification
    petitions_signed{
      id
    }
  }
}
`


