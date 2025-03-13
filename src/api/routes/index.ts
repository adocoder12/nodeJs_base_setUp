import { Router } from "express";

//imported Routes
import userRoute from "./authRoute";
import moviesRoute from "./moviesRoute";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API routes: /auth , /movies " });
});

/*--- ROUTES IN USE ---*/

router.use("/auth", userRoute);
router.use("/movies", moviesRoute);

export default router;
