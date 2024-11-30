import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    hello: String
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    login(email: String!, password: String!): AuthPayload
  }

  type User {
    id: ID
    name: String
    email: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`);
