import { Router } from "express";
const router = Router();

import {
  getMovies,
  updateMovie,
  getMovieByID,
  addMovie,
} from "../controller/movies_controller";

router.get("/", getMovies);
router.get("/:id", getMovieByID);
router.patch("/:id", updateMovie);
router.post("/addMovie", addMovie);

export default router;
