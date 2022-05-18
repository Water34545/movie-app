import { filmPreview } from "./filmPreview"

export interface moviesResponce {
  results: filmPreview[]
  page: number
  total_pages: number
  total_results: number
}