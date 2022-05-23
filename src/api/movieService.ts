import Api from './api';
import { IAuthResponce } from './utils/IAuthResponce';
import { IGenersResponce } from './utils/IGenersResponce';
import { IGetAccount } from './utils/IGetAccount';
import { IUser } from './utils/IUser';
import { IGetFavorite } from './utils/IGetFavorite';
import { IGetSession } from './utils/IGetSession';
import { IGetSessionResponce } from './utils/IGetSessionResponce';
import { IMovieDiscover } from './utils/IMovieDiscover';
import { IMoviesResponce } from './utils/IMoviesResponce';
import { ILogin } from './utils/ILogin';
import ISetFavorite from './utils/ISetFavorite';
import { IGetMovie } from './utils/IGetMovie';
import IMovieResponce from './utils/IMovieResponce';

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
  getToken: () => {
    return Api.get<IAuthResponce>('/authentication/token/new', {params: {
      api_key
    }});
  },
  login: (props: ILogin) => {
    return Api.post<IAuthResponce>(`/authentication/token/validate_with_login?api_key=${api_key}`, {
      ...props,
    });
  },
  getSession: (props: IGetSession) => {
    return Api.post<IGetSessionResponce>(`/authentication/session/new?api_key=${api_key}`, {
      ...props,
    });
  },
  setFavorite: (props: ISetFavorite) => {
    return Api.post(`/account/${props.account_id}/favorite?api_key=${api_key}&session_id=${props.session_id}`, {
      media_type: "movie",
      media_id: props.media_id,
      favorite: props.favorite
    }, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  },
  getAccount: (props: IGetAccount) => {
    return Api.get<IUser>(`/account`, {params: {
      api_key,
      ...props,
    }});
  },
  getFavorite: (props: IGetFavorite) => {
    return Api.get<IMoviesResponce>(`/account/${props.account_id}/favorite/movies`, {params: {
      api_key,
      language,
      session_id: props.session_id
    }})
  },
  getMovie: (props: IGetMovie) => {
    return Api.get<IMovieResponce>(`/movie/${props.movie_id}?api_key=${api_key}&language=en-US`)
  }
};