import express from "express";
import { boomErrorHandler, errorHandler, logHandler } from "./middlewares/error.handles";
import { routerApi } from "./routes";
import cors from "cors";

const port = "3000";
const app = express();

app.use(express.json());

const whiteList = ["http://localhost:8080"];
const options = {
  origin: (origin: any, callback: any) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors());

routerApi(app);

/**
 * @middlewares
 */
app.use(logHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port" + port);
});
