import {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { filmPreview } from '../../api/utils/filmPreview';

const imageLocation = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

const FilmPrev: FC<filmPreview> = ({original_title, vote_average, release_date, overview, poster_path}) => {
  return (
    <Card sx={{ display: 'flex', mt: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}> 
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Raiting {vote_average}
          </Typography>
          {original_title.length < 14 ? 
          <Typography component="div" variant="h5">
            {original_title}
          </Typography> : 
          <Tooltip title={original_title} placement="top">
            <Typography component="div" variant="h5">
              {original_title.slice(0, 14)}...
            </Typography>
          </Tooltip>}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Release: {release_date}
          </Typography>
          <Typography variant="body2">
            {overview.length < 75 ? overview : overview.slice(0, 75) + '...'}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button size="small">More info</Button>
          <Tooltip title="Add to favorite" placement="top">
              <IconButton>
                <FavoriteIcon />
              </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={`${imageLocation}${poster_path}`}
        alt={original_title}
      />
    </Card>
  );
}

export default FilmPrev;