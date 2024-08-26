import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';

import connectDB from './config/db';
import { schema } from './graphql';
import { authResolver, crawlJobResolver } from './resolvers';
import { formatGraphQLError } from './utils';

const URL_ALLOW_CORS = 'http://localhost:5173';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: URL_ALLOW_CORS }));
app.use(express.json());

const rootValue = {
  ...authResolver,
  ...crawlJobResolver,
};

app.use(
  '/graphql',
  createHandler({
    schema,
    rootValue: rootValue,
    formatError: formatGraphQLError,
  }),
);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
