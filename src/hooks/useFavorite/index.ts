import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../useAuth";
import { movieService } from '../../api/movieService';
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import { useNavigate } from 'react-router-dom';

const useFavorite = () => {
  const [favorite, setFavorite] = useState<IFilmPreview[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const {user, session_id} = useAuth();
  const navigate = useNavigate();

  const getFavorite = useCallback(async() => {
    try {
      if (user && session_id) {
        const {data: {results}} = await movieService.getFavorite({account_id: user.id, session_id});
        setFavorite(results);
        setFavoriteIds(results.map(movie => movie.id));
      }
    } catch (error) {
      console.log('movieDiscover error');
    }
  }, [session_id, user]);

  const updateFavorite = async (id: number, isFavorite?: boolean) => {
    if(id === -1) return;
    if(!user || !session_id) navigate('/login');
    try {
      if(user && session_id) {
        const {data: {success}} = await movieService.setFavorite({
          session_id, 
          account_id: user.id, 
          media_id: id, 
          favorite: !isFavorite
        });
        if(success) {
          const newFavorite = [...favoriteIds];
          isFavorite ? newFavorite.splice(newFavorite.indexOf(id), 1 ) : newFavorite.push(id);
          setFavoriteIds(newFavorite);
          getFavorite();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFavorite();
  }, [getFavorite]);

  return {favorite, favoriteIds, updateFavorite}
}

export default useFavorite;