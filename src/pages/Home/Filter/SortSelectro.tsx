import { FC, memo } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { IMovieDiscover } from '../../../api/utils/IMovieDiscover';
import { menuProps, sortValues } from './const';

interface ISortSelector {
  sort_by?: string
  onChange: (value: IMovieDiscover) => void
};

const SortSelector: FC<ISortSelector> = ({sort_by, onChange}) => <Grid item md={4} sm={6} xs={12}>
  <FormControl sx={{width: '100%' }}>
    <InputLabel id="choose-sort">Choose sort</InputLabel>
    <Select
      labelId="Choose sort"
      value={sort_by || ''}
      label="Choose sort"
      onChange={({target: {value}}) => onChange({sort_by: value})}
      MenuProps={menuProps}>
      {sortValues.map(item => 
        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
      }
    </Select>
  </FormControl>
</Grid>;

export default memo(SortSelector);