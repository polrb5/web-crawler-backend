import dotenv from "dotenv";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";

import connectDB from "./config/db";
import { schema } from "./graphql";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/graphql", createHandler({ schema }));

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
