import { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";
import {
  partialValidateMovie,
  validateMovie,
} from "../../schemas_zod/movie_schema";
import CustomError from "../../classes/CustomError";

import movies from "../../utils/movies.json";

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  const { genre } = req.query;

  try {
    console.log(movies[0].title.toLowerCase());

    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some(
          (g) =>
            typeof g === "string" &&
            typeof genre === "string" &&
            g.toLowerCase() === genre.toLowerCase()
        )
      );
      if (filteredMovies.length === 0) {
        throw new CustomError("No gender found", 404);
      }
      res.status(200).json(filteredMovies);
    }
    res.status(200).json({ message: "Movies found", data: movies });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const getMovieByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;
  try {
    if (!name) {
      throw new CustomError("Provide a movie name", 400);
    }

    const movie = movies.find(
      (movie) => movie.title.toLowerCase() === name.toLowerCase()
    );

    if (!movie) {
      throw new CustomError("Movie not found", 404);
    }
    res.status(200).json({ message: "Movie found", data: movie });
  } catch (error) {
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
      throw new CustomError("Movie not found", 404);
    }
    res.status(200).json({ message: "Movie found", data: movie });
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const result = validateMovie(req.body);

    if (!result.success) {
      throw new CustomError(result.error.message, 400);
    }

    movies.map((movie) => {
      if (movie.title === title) {
        throw new CustomError("Movie already exists", 400);
      }
    });

    const newMovie = {
      id: randomUUID(),
      ...result.data,
    };
    movies.push(newMovie);

    res.status(201).json({ message: "Movie added", data: newMovie });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new CustomError("Provide a movie id", 400);
    }

    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new CustomError("Movie doesnt exist", 404);
    }

    const result = partialValidateMovie(req.body);
    if (!result.success) {
      throw new CustomError(result.error.message, 400);
    }
    const updatedMovie = { ...movies[movieIndex], ...result.data };
    movies[movieIndex] = updatedMovie;

    res
      .status(200)
      .json({ message: "Movie updated", data: movies[movieIndex] });
  } catch (error) {
    next(error);
  }
};
export { getMovies, getMovieByID, updateMovie, addMovie, getMovieByName };
