import { Router } from "express";

//imported Routes
import moviesRoute from "./moviesRoute";

// the router
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: `API routes:  /movies`,
  });
});

/*--- ROUTES IN USE ---*/

router.use("/movies", moviesRoute);

export default router;
