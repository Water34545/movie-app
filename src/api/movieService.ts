import Api from './api';
import { moviesResponce } from './utils/moviesResponce';

const api_key = 'cb04e99c26b90dd693ce35bda9db5d36';
const language = 'en-US';
const page = 1;

export const movieService = {
  getPopular: () => {
    return Api.get<moviesResponce>('/movie/popular', {params: {
      api_key,
      language,
      page
    }}); 
  },
};