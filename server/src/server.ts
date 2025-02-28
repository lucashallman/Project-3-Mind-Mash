import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { Request, Response } from 'express';

import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authenticateToken } from './utils/auth.js';
import routes from './routes/index.js';
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(routes);
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server,{
    context: authenticateToken,
  }));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
