import { FC } from 'react';
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
import Rating from '@mui/material/Rating';
import Grid from '@mui/material//Grid'
import { IFilmPreview } from '../../api/utils/IFilmPreview';
import { Link } from 'react-router-dom';

const imageLocation = 'https://image.tmdb.org/t/p/w220_and_h330_face/';

interface IFilmPrev extends IFilmPreview {
  isFavorite: boolean
  favoriteHandle: (id: number, isFavorite: boolean) => void
}

const FilmPrev: FC<IFilmPrev> = ({id, title, vote_average, release_date, overview, poster_path, isFavorite, favoriteHandle}) => {
  return <Grid item md={4} sm={6} xs={12}>
    <Card sx={{ display: 'flex', mt: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}> 
          <Rating name="read-only" value={vote_average/2} readOnly size="small"/>
          {title.length < 20 ? 
          <Typography component="div" variant="h5" sx={{height: 65, overflow: 'hidden'}}>
            {title}
          </Typography> : 
          <Tooltip title={title} placement="top" sx={{height: 65 }}>
            <Typography component="div" variant="h5">
              {title.slice(0, 20)}...
            </Typography>
          </Tooltip>}
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Release: {release_date}
          </Typography>
          <Typography variant="body2" sx={{height: 65 }}>
            {overview.length < 65 ? overview : overview.slice(0, 61) + '...'}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Link to={`/${id}`}>
            <Button size="small">More info</Button>
          </Link>
          <Tooltip title={isFavorite ? 'Delete from Watchlist' : 'Add to Watchlist'} placement="top">
              <IconButton onClick={() => favoriteHandle(id, isFavorite)}>
                <FavoriteIcon color={isFavorite ? 'secondary' : 'inherit'}/>
              </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
      {poster_path && <CardMedia
        component="img"
        sx={{ width: 151 }}
        src={`${imageLocation}${poster_path}`}
        alt={title}
      />}
    </Card>
  </Grid>;
}

export default FilmPrev;