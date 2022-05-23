import { IFilmGener } from "./IGenersResponce"

export default interface IMovieResponce {
  adult?: boolean
  backdrop_path?: string
  belongs_to_collection?: object
  budget?: number
  genres?: IFilmGener[]
  homepage?: string
  id?: number
  imdb_id?: string
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  production_companies?: IProductionCompanies[]
  origin_country?: string
  production_countries?: IProductionCountries[]
  release_date?: string
  revenue?: number
  runtime?: number
  spoken_languages?: ISpokenLanguages[]
  status?: string
  tagline?: string
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

interface ISpokenLanguages {
  iso_639_1?: string
  name?: string
}

interface IProductionCountries {
  iso_3166_1?: string
  name?: string
}

interface IProductionCompanies {
  name?: string
  id?: number
  logo_path?: string
  origin_country?: string
}