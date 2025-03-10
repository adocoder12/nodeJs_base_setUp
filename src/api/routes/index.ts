import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API routes: /auth  , /users" });
});

export default router;
