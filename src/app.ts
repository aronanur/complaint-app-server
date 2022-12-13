import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./routes";
import errorHandler from "./middlewares/ErrorHandler";

const app = express();
const port = process.env.PORT || 3000;

/** Handle Body Parser */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/** Handle NODE ENV on development mode */
dotenv.config();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
