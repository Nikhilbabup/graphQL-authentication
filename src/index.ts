import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import mongoose from 'mongoose';
import { resolvers } from "./resolver";

const app = express();
const PORT = 4000;

mongoose
  .connect("mongodb://localhost:27017/graphql-api")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});



