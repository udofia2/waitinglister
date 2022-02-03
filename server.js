import { config } from "dotenv";
config();
import log from "./config/logger.js";
import express from "express";
import cors from "cors";
import listerRouter from './routes/lister.router.js'


import db from './config/db_connection.js'

db()

const app = express();


app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);


app.use("/api/v1/", listerRouter);

app.use((req, res) => {
  log(req, res)
  res.status(404).json({
    status: "fail",
    message: `Sorry!!!, can't find ${req.get("host")}${req.url}. Please visit ${req.get(
      "host"
    )}/api/v1/signup. METHOD: post. Kindly use a valid email address so that you can receive notification after signup`,
  });
});

app.listen(parseInt(process.env.PORT), () =>
  console.log(`Server is connected on ${parseInt(process.env.PORT)}`)
);

export default app;
