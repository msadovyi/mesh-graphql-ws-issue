const ws = require('ws');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { useServer } = require('graphql-ws/lib/use/ws');
const { buildSchema } = require('graphql');
const path = require('path');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
  type Subscription {
    greetings: String
  }
`);

// The roots provide resolvers for each GraphQL operation
const roots = {
  query: {
    hello: () => 'Hello World!',
  },
  subscription: {
    greetings: async function* sayHiIn5Languages() {
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield { greetings: hi };
      }
    },
  },
};
// create express
const app = express();

// create apollo server
const apolloServer = new ApolloServer({ schema, playground: true });

// apply middleware
apolloServer.applyMiddleware({ app });

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')))

const server = app.listen(3000, () => {
  // create and use the websocket server
  const wsServer = new ws.Server({
    server,
    path: '/graphql',
  });

  useServer({ schema, roots }, wsServer);
  console.log('Source listening on port 3000...');
});