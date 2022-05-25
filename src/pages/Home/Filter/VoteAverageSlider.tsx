import { FC, useState, useEffect, useCallback, useRef, memo } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { IMovieDiscover, IVoteAverage } from '../../../api/utils/IMovieDiscover';

interface IVoteAverageSlider {
  min?: number
  max?: number
  onChange: (value: IMovieDiscover) => void
};

const VoteAverageSlider: FC<IVoteAverageSlider> = ({min, max, onChange}) => {
  const [range, setGange] = useState([0, 10]);
  
  useEffect(() => {
    setGange([min || 0, max || 10]);
  }, [min, max]);

  let timer: NodeJS.Timeout;

  const handleChange = useCallback((event: Event, value: number | number[]) => {
    clearTimeout(timer);
    if (!Array.isArray(value)) return onChange({
      [IVoteAverage.gte]: 0,
      [IVoteAverage.lte]: 10
    });
    setGange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => {
      onChange({
        [IVoteAverage.gte]: value[0],
        [IVoteAverage.lte]: value[1]
      });
    }, 300)
  }, []);

  return <Grid item md={4} xs={12}>
    <Typography id="input-slider" gutterBottom>
      Set Raiting
    </Typography>
    <Slider
      value={[range[0], range[1]]}
      onChange={handleChange}
      valueLabelDisplay="auto"
      max={10}
      step={0.1}/>
  </Grid>
}

export default memo(VoteAverageSlider);