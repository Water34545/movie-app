import { IFilmPreview } from "./IFilmPreview"

export interface moviesResponce {
  results: IFilmPreview[]
  page: number
  total_pages: number
  total_results: number
}