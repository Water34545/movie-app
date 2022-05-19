import Api from './api';
import { IFilmGeners } from './utils/IFilmGenres';
import { movieDiscoverProps } from './utils/movieDiscoverProps';
import { moviesResponce } from './utils/moviesResponce';

const api_key = 'cb04e99c26b90dd693ce35bda9db5d36';
const language = 'en-US';
const page = 1;

export const movieService = {
  movieDiscover: (props: movieDiscoverProps) => {
    return Api.get<moviesResponce>('/discover/movie', {params: {
      ...props,
      api_key,
      language,
      page,
      with_genres: props.with_genres?.join(',')
    }}); 
  },
  getGeners: () => {
    return Api.get<IFilmGeners>('/genre/movie/list', {params: {
      api_key,
      language,
    }}); 
  },
};