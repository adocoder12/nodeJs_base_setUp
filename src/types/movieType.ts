enum Genre {
  Action = "Action",
  Adventure = "Adventure",
  Animation = "Animation",
  Biography = "Biography",
  Comedy = "Comedy",
  Crime = "Crime",
  Documentary = "Documentary",
  Drama = "Drama",
  Family = "Family",
}

type movie = {
  id: string;
  title: string;
  year: number;
  director: string;
  duration: number;
  poster: string;
  genre: Genre[] | Genre;
  rate: string;
};

export default movie;
