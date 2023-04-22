import { log } from "console";
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
import dotenv from "dotenv";

import authenticator from "./middleware/authenticate.js";

// routers
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";

import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import connectDB from "./db/connectDB.js";
// import xss from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(resolve(dirname(__dirname), "./client/dist")));

// log(dirname(__dirname));
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cors());
app.use(helmet());
// app.use(xss());
app.use(mongoSanitize());

app.get("/api", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticator, tasksRouter);

app.get("*", (req, res) => {
  res.sendFile(resolve(dirname(__dirname), "./client/dist", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  if (!process.env.MONGO_URI) return;
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => log(`server is listening on port ${port}`));
  } catch (error) {
    log(error);
  }
};

start();
