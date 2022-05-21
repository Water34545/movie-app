import Api from './api';
import { IAuthResp } from './utils/IAuthResp';
import { IGenersResponce } from './utils/IGenersResponce';
import { IGetAccount } from './utils/IGetAccount';
import { IUser } from './utils/IUser';
import { IGetFavoritData } from './utils/IGetFavoritData';
import { IGetSessionData } from './utils/IGetSessionData';
import { IGetSessionResp } from './utils/IGetSessionResp';
import { IMovieDiscover } from './utils/IMovieDiscover';
import { IMoviesResponce } from './utils/IMoviesResponce';
import { IUserData } from './utils/IUserData';
import ISetFavorite from './utils/ISetFavorite';

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
    return Api.get<IAuthResp>('/authentication/token/new', {params: {
      api_key
    }});
  },
  login: (props: IUserData) => {
    return Api.post<IAuthResp>(`/authentication/token/validate_with_login?api_key=${api_key}`, {
      ...props,
    });
  },
  getSession: (props: IGetSessionData) => {
    return Api.post<IGetSessionResp>(`/authentication/session/new?api_key=${api_key}`, {
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
  getFavorite: (props: IGetFavoritData) => {
    return Api.get<IMoviesResponce>(`/account/${props.account_id}/favorite/movies`, {params: {
      api_key,
      language,
      session_id: props.session_id
    }})
  }
};