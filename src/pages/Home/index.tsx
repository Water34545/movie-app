import {useState, useEffect} from 'react';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { movieService } from '../../api/movieService';
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import FilmPrev from '../../components/FilmPrev';
import { IMovieDiscover, IVoteAverage } from '../../api/utils/IMovieDiscover';
import { IFilmGener } from '../../api/utils/IGenersResponce';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sortValues = [
  {value: 'popularity.asc', name: 'Sort by popularity ↓'},
  {value: 'popularity.desc', name: 'Sort by popularity ↑'},
  {value: 'release_date.asc', name: 'Sort by release date ↓'},
  {value: 'elease_date.desc', name: 'Sort by release date ↑'},
  {value: 'revenue.asc', name: 'Sort by revenue ↓'},
  {value: 'revenue.desc', name: 'Sort by revenue ↑'},
  {value: 'original_title.asc', name: 'Sort by title ↓'},
  {value: 'original_title.desc', name: 'Sort by title ↑'},
  {value: 'vote_average.asc', name: 'Sort by average ↓'},
  {value: 'vote_average.desc', name: 'Sort by average ↑'},
]

const HomePage = () => {
  const [filterValues, setFilterValues] = useState<IMovieDiscover>({
    [IVoteAverage.gte]: 0,
    [IVoteAverage.lte]: 10
  });
  const [films, setFilms] = useState<IFilmPreview[]>([]);
  const [filmGenres, setFilmGenres] = useState<IFilmGener[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const {data: {results}} = await movieService.movieDiscover(filterValues);
        setFilms(results);
      } catch {
        console.log('movieDiscover error');
      }
    }
    const timeout = setTimeout(() => {
      fetchFilms();
    }, 300);
    return () => clearTimeout(timeout);
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

  const handleChangeGenres = (event: SelectChangeEvent<number[]>) => {
    const {target: {value}} = event;
    setFilterValues({
      ...filterValues, 
      with_genres: typeof value === 'string' ? [] : value
    });
  };

  const handleChangeSlider = (event: Event, value: number | number[]) => {
    if (!Array.isArray(value)) return;

    setFilterValues({
      ...filterValues,
      [IVoteAverage.gte]: value[0],
      [IVoteAverage.lte]: value[1]
    })
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFilterValues({
      ...filterValues,
      sort_by: event.target.value as string});
  };

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <Typography variant="h2" component="h1" gutterBottom>
      Home: see and filter moovies!
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl sx={{width: '100%' }}>
          <InputLabel id="genre-label">Choose genre</InputLabel>
            <Select
              labelId="genre-label"
              multiple
              value={filterValues.with_genres || []}
              onChange={handleChangeGenres}
              input={<OutlinedInput label="Choose genre" />}
              MenuProps={MenuProps}
              renderValue={selected => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {filmGenres.filter(gener => selected.includes(gener.id)).map(gener => (
                    <Chip key={gener.id} label={gener.name} variant="outlined" sx={{height: 23}}/>
                  ))}
                </Box>
              )}>
                {filmGenres.map(genre => (
                  <MenuItem
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </MenuItem>)
                )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{width: '100%' }}>
            <InputLabel id="choose-sort">Choose sort</InputLabel>
            <Select
              labelId="Choose sort"
              value={filterValues.sort_by}
              label="Choose sort"
              onChange={handleChangeSelect}
              MenuProps={MenuProps}
            >
              {sortValues.map(item => 
                <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Typography id="input-slider" gutterBottom>
            Set Raiting
          </Typography>
          <Slider
            value={[filterValues[IVoteAverage.gte], filterValues[IVoteAverage.lte]]}
            onChange={handleChangeSlider}
            valueLabelDisplay="auto"
            max={10}
            step={0.1}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {films.map(film => <Grid item xs={4} key={film.id}>
          <FilmPrev {...film}/>
        </Grid>)}
      </Grid>
    </Container>
}

export default HomePage;
