import gql from 'graphql-tag';

export const SIGNUP = gql`
	mutation($username: String!, $password: String!, $token: String) {
		signup(username: $username, password: $password, token: $token) {
			token
			user {
				id
				username
				phone
			}
		}
	}
`;
