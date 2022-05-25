import { FC, useCallback, useMemo, memo} from 'react';
import Grid from '@mui/material/Grid';
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
  const handleFilterChange = useCallback((value: IMovieDiscover) => {
    if(typeof(value)=== 'string') return;
    setFilterValues((prevState) => ({
      ...prevState,
      ...value
    }));
  }, [setFilterValues]);

  return <Grid container spacing={2}>
    <GenresSelector 
      onChange={handleFilterChange} 
      with_genres={filterValues.with_genres} 
      filmGenres={filmGenres}
    />
    <SortSelector 
      onChange={handleFilterChange}
      sort_by={filterValues.sort_by}
    />
    <VoteAverageSlider 
      onChange={handleFilterChange}
      min={filterValues[IVoteAverage.gte]}
      max={filterValues[IVoteAverage.lte]}
    />
  </Grid>
}

export default memo(MoviesFilter);