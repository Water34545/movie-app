import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { movieService } from '../../api/movieService';

const WatchlListPage = () => {
  const [watchList, setWatchList] = useState(null);

  useEffect(() => {
    const getWatchList = async () => {
      try {
        //const {data} = await movieService
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
  

  return <Container sx={{ mt: '90px', mb: '30px'}}>WatchlListPage</Container>
}

export default WatchlListPage;