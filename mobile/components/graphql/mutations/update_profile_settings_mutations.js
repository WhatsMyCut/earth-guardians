import gql from 'graphql-tag';



export const UPDATE_PROFILE_SETTINGS = gql`
 mutation($id:ID!, $push_notifications_enabled: Boolean, $action_reminders:Boolean, $new_features_notification: Boolean, $new_highlights_notification: Boolean){
  updateUser(
        where:{
            id:$id
            }, 
        data:{
                push_notifications_enabled: $push_notifications_enabled,
                action_reminders: $action_reminders,
                new_features_notification: $new_features_notification,
                new_highlights_notification: $new_highlights_notification
            }){
      id
  }
}

`