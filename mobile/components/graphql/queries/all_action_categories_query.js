import gql from 'graphql-tag';


export const ALL_ACTION_CATEGORIES = gql`
query($name: String!){
  actionCategories(where:{name:$name}){
    id
    primary_image
    video_id
    actions(where:{isGame: false, active:true}, orderBy:order_ASC){
      id
      primary_image
      short_description
      carbon_dioxide
      water
      waste
      video_url
      related_actions {
        id
        primary_image
        short_description
      }
    }
    
  }
}

`