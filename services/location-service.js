const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { gql } = require('graphql-tag')
const { buildSubgraphSchema } = require('@apollo/subgraph')

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])
  type Query {
    """
    The full list of locations presented by the Interplanetary Space Tourism department
    """
    locations: [Location!]!
  
    """The details of a specific location"""
    location(id: ID!): Location
  }

  type Location @key(fields: "id") {
    id: ID!
  
    """The name of the location"""
    name: String!
  
    """A short description about the location"""
    description: String!
  
    """The location's main photo as a URL"""
    photo: String!
  }
`

const locationA = {
    id: '123',
    name: 'Example Location',
    description: 'foo',
    photo: 'bar'
}

const resolvers = {
    Query: {
        location() {
            return locationA
        },
        locations() {
            return [locationA]
        },
    },
}


const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const run = async () => {
    // Note the top-level await!
    const { url } = await startStandaloneServer(server)
    console.log(`🚀  Server ready at ${url}`)
}

run()
