import gql from 'graphql-tag';


export const ALL_ACTION_CATEGORIES = gql`
query($name: String!){
  sectorActionsByName(name:$name){
    id
  	name
    primary_image
    video_id
    actions{
      id
      primary_image
      short_description
      points
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