import {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { movieService } from '../../api/movieService';
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import FilmPrev from '../../components/FilmPrev';
import { IMovieDiscover } from '../../api/utils/IMovieDiscover';
import { IFilmGener } from '../../api/utils/IGenersResponce';
import Typography from '@mui/material/Typography';
import useFavorite from '../../hooks/useFavorite';
import MoviesFilter from './Filter/MoviesFilter';

const HomePage = () => {
  const [filterValues, setFilterValues] = useState<IMovieDiscover>({});
  const [films, setFilms] = useState<IFilmPreview[]>([]);
  const [filmGenres, setFilmGenres] = useState<IFilmGener[]>([]);
  const {favoriteIds, updateFavorite} = useFavorite();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const {data: {results}} = await movieService.movieDiscover(filterValues);
        setFilms(results);
      } catch {
        console.log('movieDiscover error');
      }
    }
    fetchFilms();
  }, [filterValues]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const {data: {genres}} = await movieService.getGeners();
        setFilmGenres(genres);
      } catch {
        console.log('getGeners error');
      }
    }
    fetchFilms();
  }, []);

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Home: see and filter moovies!
    </Typography>
    <MoviesFilter 
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      filmGenres={filmGenres}
      />
    <Grid container spacing={2}>
      {films.map(film => <FilmPrev 
        key={film.id} 
        {...film} 
        isFavorite={favoriteIds.includes(film.id)} 
        favoriteHandle={updateFavorite}/>
      )}
    </Grid>
  </Container>
}

export default HomePage;
