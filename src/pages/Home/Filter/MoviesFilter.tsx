import { FC } from 'react';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material/Select';
import { IMovieDiscover, IVoteAverage } from '../../../api/utils/IMovieDiscover';
import { IFilmGener } from '../../../api/utils/IGenersResponce';
import GenresSelector from './GenreSelector';
import SortSelector from './SortSelectro';
import VoteAverageSlider from './VoteAverageSlider';

interface IMoviesFilter {
  filterValues: IMovieDiscover
  filmGenres: IFilmGener[]
  setFilterValues: React.Dispatch<React.SetStateAction<IMovieDiscover>>
}

const MoviesFilter: FC<IMoviesFilter> = ({filterValues, filmGenres, setFilterValues}) => {
  const handleChangeGenres = (event: SelectChangeEvent<number[]>) => {
    const {target: {value}} = event;
    setFilterValues({
      ...filterValues, 
      with_genres: typeof value === 'string' ? [] : value
    });
  };

  const handleChangeCort = (event: SelectChangeEvent) => {
    setFilterValues({
      ...filterValues,
      sort_by: event.target.value as string});
  };

  const handleChangeRaiting = (event: Event, value: number | number[]) => {
    if (!Array.isArray(value)) return;

    setFilterValues({
      ...filterValues,
      [IVoteAverage.gte]: value[0],
      [IVoteAverage.lte]: value[1]
    })
  };

  return <Grid container spacing={2}>
    <GenresSelector 
      onChange={handleChangeGenres} 
      with_genres={filterValues.with_genres} 
      filmGenres={filmGenres}
    />
    <SortSelector 
      onChange={handleChangeCort}
      sort_by={filterValues.sort_by}
    />
    <VoteAverageSlider 
      onChange={handleChangeRaiting}
      min={filterValues[IVoteAverage.gte]}
      max={filterValues[IVoteAverage.lte]}
    />
  </Grid>
}

export default MoviesFilter