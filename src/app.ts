import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import menuRoutes from "./routes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(menuRoutes);

const buildMongoURi = (format: string) => {
  if (format === "standard") {
    const port = process.env.MONGO_PORT ?? 27017;
    const credentials = process.env.MONGO_USER
      ? `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`
      : "";
    return `mongodb://${credentials}${process.env.MONGO_HOST}:${port}/${process.env.MONGO_DB}?useNewUrlParser=true`;
  } else {
    return `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  }
};

const uri: string = buildMongoURi(`${process.env.MONGO_URI_FORMAT}`);
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
