console.log("app.js running");
import express from "express";
import morgan from "morgan";
import errorHandler from "./middleware/errorHandler.js";
import student from "./routes/studentRoute.js";
import fns from "date-fns";

const app = express();

morgan.token("body", req => JSON.stringify(req.body));

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Used only once to upload to DB
app.use("/student", student);

app.use(errorHandler);

export default app;
