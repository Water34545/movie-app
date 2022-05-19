import { IFilmPreview } from "./IFilmPreview"

export interface IMoviesResponce {
  results: IFilmPreview[]
  page: number
  total_pages: number
  total_results: number
}