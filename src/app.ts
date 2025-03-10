import express, { Request, Response } from "express";
import routes from "./api/routes/index";
import { notFound, errorHandler } from "./utils/middlewares";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API location: api/v1" });
});

/*--- ROUTES ---*/

app.use("/api/v1", routes);

/*---  HELPERS   ---*/

app.use(notFound);
app.use(errorHandler);

export default app;
