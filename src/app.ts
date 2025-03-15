import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
//routes
import routes from "./api/routes/index";
//middlewares
import { notFound, errorHandler } from "./utils/middlewares";

const app = express();

app.disable("x-powered-by");

//For parsing application/json
app.use(express.json());

//For security best practices through HTTP headers.
app.use(helmet());

/*--- CORS ---*/

app.use(cors());
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
