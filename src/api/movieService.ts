import Api from './api';
import { IAuthResp } from './utils/IAuthResp';
import { IGenersResponce } from './utils/IGenersResponce';
import { IMovieDiscover } from './utils/IMovieDiscover';
import { IMoviesResponce } from './utils/IMoviesResponce';
import { IUserData } from './utils/IUserData';

const api_key = 'cb04e99c26b90dd693ce35bda9db5d36';
const language = 'en-US';
const page = 1;

export const movieService = {
  movieDiscover: (props: IMovieDiscover) => {
    return Api.get<IMoviesResponce>('/discover/movie', {params: {
      ...props,
      api_key,
      language,
      page,
      with_genres: props.with_genres?.join(',')
    }}); 
  },
  getGeners: () => {
    return Api.get<IGenersResponce>('/genre/movie/list', {params: {
      api_key,
      language,
    }}); 
  },
  login: (props: IUserData) => {
    return Api.get<IAuthResp>('authentication/token/new', {params: {
      ...props,
      api_key
    }});
  }
};