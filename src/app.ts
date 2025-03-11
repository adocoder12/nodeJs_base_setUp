import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
//routes
import routes from "./api/routes/index";
//middlewares
import { notFound, errorHandler } from "./utils/middlewares";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

/*--- CORS ---*/

// app.use("*", cors());
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.REACT_URI}`
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "Authorization");

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API location: api/v1" });
});

/*--- ROUTES ---*/

app.use("/api/v1", routes);

/*---  HELPERS   ---*/

app.use(notFound);
app.use(errorHandler);

export default app;
