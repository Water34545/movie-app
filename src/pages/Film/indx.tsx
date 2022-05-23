import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IMovieResponce from "../../api/utils/IMovieResponce";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';
import { movieService } from "../../api/movieService";
import useFavorite from "../../hooks/useFavorite";

const imageLocation = 'https://image.tmdb.org/t/p/w300_and_h450_face/';

const Film = () => {
  const {movie_id} = useParams();
  const [film, setFilm] = useState<IMovieResponce>({});
  const [isFavorite, setIsFavorite] = useState(false)
  const {favoriteIds, updateFavorite} = useFavorite();

  useEffect(() => {
    const getMovie = async () => {
      try {
        if(movie_id) {
          const {data} = await movieService.getMovie({movie_id});
          setFilm(data);
        }
      } catch (error) {
        console.log(error)
      }
    }
    getMovie();
  }, [movie_id]);

  useEffect(() => {
    film.id && favoriteIds.includes(film.id) ?
      setIsFavorite(true) :
      setIsFavorite(false);
  }, [film.id, favoriteIds]);

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {film.poster_path && <CardMedia
          component="img"
          src={`${imageLocation}${film.poster_path}`}
          alt={film.title}
        />}
      </Grid>
      <Grid item xs={8}>
        {film.vote_average && <Rating name="read-only" value={film.vote_average/2} readOnly size="small"/>}
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h2" component="h1">
              {film.title}
            </Typography>
          </Grid>
          <Grid item>
            <Tooltip title={isFavorite ? 'Delete from Watchlist' : 'Add to Watchlist'} placement="top">
              <IconButton onClick={() => updateFavorite((film.id || -1), isFavorite)}>
                <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'}/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <Typography>
          {film.tagline}
        </Typography>
        <Typography variant="h5" component="h5">
          About film
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            Release Date
          </Grid>
          <Grid item xs={8}>
            {film.release_date}
          </Grid>
          <Grid item xs={4}>
            Budget
          </Grid>
          <Grid item xs={8}>
            {film.budget} $
          </Grid>
          <Grid item xs={4}>
            Runtime
          </Grid>
          <Grid item xs={8}>
            {film.runtime} min
          </Grid>
          <Grid item xs={4}>
            Genres
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {film.genres?.map(gener => <Chip key={gener.id} label={gener.name} />)}
            </Box>
          </Grid>
          <Grid item xs={4}>
            Production Companies
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {film.production_companies?.map(company => <Chip key={company.id} label={company.name} />)}
            </Box>
          </Grid>
          <Grid item xs={4}>
            Production Countries
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {film.production_countries?.map(country => <Chip key={country.iso_3166_1} label={country.name} />)}
            </Box>
          </Grid>
          <Grid item xs={4}>
            Spoken Languages
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {film.spoken_languages?.map(language => <Chip key={language.iso_639_1} label={language.name} />)}
            </Box>
          </Grid>
          <Grid item xs={4}>
            Overview
          </Grid>
          <Grid item xs={8}>
            {film.overview}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
}

export default Film