import { gql } from '@apollo/client';

export const ADD_USER =gql`
mutation AddUser($input: UserInput!) {
  addUser(input: $input) {
    token
  }
}
`
export const LOGIN_USER =gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`