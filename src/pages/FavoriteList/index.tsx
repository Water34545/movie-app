import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FilmPrev from '../../components/FilmPrev';
import { Typography } from '@mui/material';
import useFavorite from '../../hooks/useFavorite';

const FavoriteListPage = () => {
  const {favorite, updateFavorite} = useFavorite();

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Your Favorite List
    </Typography>
    <Grid container spacing={2}>
        {favorite.map(film => <Grid item xs={4} key={film.id}>
          <FilmPrev {...film} isFavorite favoriteHandle={updateFavorite}/>
        </Grid>)}
      </Grid>
  </Container>
}

export default FavoriteListPage;