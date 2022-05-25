import { FC } from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { menuProps, sortValues } from './const';

interface ISortSelector {
  sort_by?: string
  onChange: (event: SelectChangeEvent) => void
};

const SortSelector: FC<ISortSelector> = ({sort_by, onChange}) => <Grid item xs={4}>
  <FormControl sx={{width: '100%' }}>
    <InputLabel id="choose-sort">Choose sort</InputLabel>
    <Select
      labelId="Choose sort"
      value={sort_by || ''}
      label="Choose sort"
      onChange={onChange}
      MenuProps={menuProps}>
      {sortValues.map(item => 
        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)
      }
    </Select>
  </FormControl>
</Grid>;

export default SortSelector;