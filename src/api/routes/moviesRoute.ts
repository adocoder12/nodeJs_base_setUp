import { Router } from "express";
const router = Router();

import {
  getMovies,
  updateMovie,
  getMovieByID,
  addMovie,
  getMovieByName,
} from "../controller/movies_controller";

//get all movies
router.get("/", getMovies);
//get movie by name
router.get("/:name", getMovieByName);
//get movie by id
router.get("/:id", getMovieByID);
//add movie
router.post("/addMovie", addMovie);
//update movie
router.patch("/:id", updateMovie);

export default router;
