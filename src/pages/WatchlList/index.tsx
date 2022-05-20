import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { movieService } from '../../api/movieService';
import { useAuth } from '../../hooks/useAuth';
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import Grid from '@mui/material/Grid';
import FilmPrev from '../../components/FilmPrev';
import { Typography } from '@mui/material';

const WatchlListPage = () => {
  const [watchList, setWatchList] = useState<IFilmPreview[]>([]);
  const {user, session_id} = useAuth();

  useEffect(() => {
    const getWatchList = async () => {
      try {
        if (user && session_id) {
          const {data: {results}} = await movieService.getFavorite({account_id: user.id, session_id});
          setWatchList(results)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getWatchList();
  }, [])
  

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Your Watch List
    </Typography>
    <Grid container spacing={2}>
        {watchList.map(film => <Grid item xs={4} key={film.id}>
          <FilmPrev {...film}/>
        </Grid>)}
      </Grid>
  </Container>
}

export default WatchlListPage;