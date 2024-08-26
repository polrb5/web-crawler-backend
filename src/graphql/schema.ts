import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    email: String!
  }

  type CrawlJob {
    id: ID!
    url: String!
    status: String!
    foundUrls: [String!]!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    getCrawlJob(id: ID!): CrawlJob
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createCrawlJob(url: String!): CrawlJob
  }
`);
