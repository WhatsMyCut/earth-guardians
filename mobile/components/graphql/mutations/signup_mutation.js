import gql from 'graphql-tag';

export const SIGNUP = gql`
	mutation($username: String!, $password: String!, $device_id: String) {
		signup(username: $username, password: $password, device_id: $device_id) {
			token
			user {
				id
				username
				phone
			}
		}
	}
`;
