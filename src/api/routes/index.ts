import { Router } from "express";

//imported Routes
import userRoute from "./authRoute";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API routes: /auth " });
});

/*--- ROUTES IN USE ---*/

router.use("/auth", userRoute);

export default router;
