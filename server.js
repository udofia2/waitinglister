import { config } from "dotenv";
config();
import log from "./config/logger.js";
import express from "express";
import cors from "cors";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use((req, res) => {
  log(req, res)
  res.status(404).json({
    status: 'fail',
    message: `Sorry!!!, can't find ${req.url}. Please visit /api/v1/home`,
  });
});

app.listen(parseInt(process.env.PORT), () =>
  console.log(`Server is connected on ${parseInt(process.env.PORT)}`)
);

export default app;
