import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

import CustomError from "../../classes/CustomError";

import Tmovie from "../../types/movieType";
import movies from "../../utils/movies.json";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!movies || movies.length === 0) {
      throw new CustomError("No movies found, please try again later", 404);
      return;
    }
    res.status(200).json({ message: "Movies found", data: movies });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const getMovieByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new CustomError("Provide a movie id", 400);
      return;
    }
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new CustomError("Movie doesnt exist", 404);
      return;
    }
    res.status(200).json({ message: "Movie found", data: movie });
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body", req.body);
  const { title, year, duration, poster, genre, rate, director } = req.body;
  try {
    movies.map((movie) => {
      if (movie.title === title) {
        throw new CustomError("Movie already exists", 400);
        return;
      }
    });

    if (!title || !year || !duration || !poster || !genre || !rate) {
      throw new CustomError("information missing", 400);
      return;
    }
    const newMovie = {
      id: randomUUID(),
      title: title,
      year: year,
      director: director,
      duration: director,
      poster: poster,
      genre: genre,
      rate: rate,
    };
    movies.push(newMovie);

    res.status(201).json({ message: "Movie added", data: newMovie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, year, rating } = req.body;
  try {
    if (!id) {
      throw new CustomError("Provide a movie id", 400);
      return;
    }
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) {
      throw new CustomError("Movie doesnt exist", 404);
      return;
    }

    const updatedMovie = { ...movies[movieIndex], title, year, rating };
    res.status(200).json({ message: "Movie updated", data: updatedMovie });
  } catch (error) {
    next(error);
  }
};
export { getMovies, getMovieByID, updateMovie, addMovie };
