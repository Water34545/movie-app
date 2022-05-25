import { FC, memo } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { IMovieDiscover } from '../../../api/utils/IMovieDiscover';
import { IFilmGener } from '../../../api/utils/IGenersResponce';
import { menuProps } from './const';

interface IGenresSelector {
  with_genres?: number[]
  filmGenres: IFilmGener[]
  onChange: (value: IMovieDiscover) => void
};

const GenresSelector: FC<IGenresSelector> = ({with_genres, filmGenres, onChange}) => <Grid item md={4} sm={6} xs={12}>
  <FormControl sx={{width: '100%' }}>
    <InputLabel id="genre-label">Choose genre</InputLabel>
      <Select
        labelId="genre-label"
        multiple
        value={with_genres || []}
        onChange={({target: {value}}) => onChange({with_genres: typeof value === 'string' ? [] : value})}
        input={<OutlinedInput label="Choose genre" />}
        MenuProps={menuProps}
        renderValue={selected => <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {filmGenres.filter(gener => selected.includes(gener.id)).map(gener => 
            <Chip key={gener.id} label={gener.name} variant="outlined" sx={{height: 23}}/>
          )}</Box>}>
        {filmGenres.map(genre => <MenuItem key={genre.id} value={genre.id}>
          {genre.name}
        </MenuItem>)}
    </Select>
  </FormControl>
</Grid>

export default memo(GenresSelector);