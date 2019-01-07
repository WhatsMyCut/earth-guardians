import gql from 'graphql-tag';


export const CREATE_COMMUNITY_EVENT = gql`
 mutation($id: ID!, $type: String!, $number_of_people: Int!){
  updateUser(
        where:{
            id:$id
            }, 
        data:{
            community_events:{
                create: {
                    type: $type,
                    number_of_people: $number_of_people
                    }
                }
            }){
      id
  }
}

`