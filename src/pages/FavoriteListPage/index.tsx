import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { movieService } from '../../api/movieService';
import { useAuth } from '../../hooks/useAuth';
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import Grid from '@mui/material/Grid';
import FilmPrev from '../../components/FilmPrev';
import { Typography } from '@mui/material';

const FavoriteListPage = () => {
  const [films, setFilms] = useState<IFilmPreview[]>([]);
  const {user, session_id} = useAuth();

  useEffect(() => {
    const getWatchList = async () => {
      try {
        if (user && session_id) {
          const {data: {results}} = await movieService.getFavorite({account_id: user.id, session_id});
          setFilms(results)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getWatchList();
  }, []);

  const addOfDeleteVaforite = (id: number, isFavorite: boolean) => {
    console.log(id)
  }

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Your Favorite List
    </Typography>
    <Grid container spacing={2}>
        {films.map(film => <Grid item xs={4} key={film.id}>
          <FilmPrev {...film} isFavorite favoriteHandle={addOfDeleteVaforite}/>
        </Grid>)}
      </Grid>
  </Container>
}

export default FavoriteListPage;