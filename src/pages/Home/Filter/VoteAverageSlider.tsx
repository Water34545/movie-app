import { FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface IVoteAverageSlider {
  min?: number
  max?: number
  onChange: (event: Event, value: number | number[]) => void
};

const VoteAverageSlider: FC<IVoteAverageSlider> = ({min, max, onChange}) => <Grid item xs={4}>
  <Typography id="input-slider" gutterBottom>
    Set Raiting
  </Typography>
  <Slider
    value={[min || 0, max || 10]}
    onChange={onChange}
    valueLabelDisplay="auto"
    max={10}
    step={0.1}/>
</Grid>

export default VoteAverageSlider