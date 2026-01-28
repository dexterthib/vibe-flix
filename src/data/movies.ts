export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  description: string;
};

export const MOVIES: Movie[] = [
  { id: 1, title: "Midnight Heist", year: 2024, genre: "Thriller", description: "A crew plans the perfect job—until the plan starts watching them back." },
  { id: 2, title: "Neon Skies", year: 2023, genre: "Sci-Fi", description: "A pilot finds a signal that shouldn’t exist… and follows it anyway." },
  { id: 3, title: "Small Town Hero", year: 2022, genre: "Drama", description: "A quiet life gets loud when someone finally needs help." },
  { id: 4, title: "Laugh Track", year: 2021, genre: "Comedy", description: "An open-mic night turns into a chain reaction of bad ideas and good friends." },
  { id: 5, title: "Ocean Signal", year: 2020, genre: "Mystery", description: "A missing broadcast pulls a diver into a story no one wants told." },
  { id: 6, title: "The Last Level", year: 2025, genre: "Action", description: "One run. One shot. One last level between you and the end." },
  { id: 7, title: "Quiet Minutes", year: 2019, genre: "Indie", description: "Two strangers share a bench and accidentally change each other’s week." },
  { id: 8, title: "Desert Run", year: 2018, genre: "Adventure", description: "A map, a storm, and a promise made years ago." },
];
