import { z } from "zod";
import Tmovie from "../types/movieType";

export const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Crime",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Sci-Fi",
    ]),
    {
      required_error: "Movie genre is required.",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
});

const validateMovie = (input: Tmovie) => {
  return movieSchema.safeParse(input);
};

const partialValidateMovie = (input: Partial<Tmovie>) => {
  return movieSchema.partial().safeParse(input);
};

export { validateMovie, partialValidateMovie };
