import {useState, useEffect} from 'react';
import Header from '../Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { movieService } from '../../api/movieService';
import { filmPreview } from '../../api/utils/filmPreview';
import FilmPrev from '../FilmPrev';

const App = () => {
  const [seachFilm, setSeachFilm] = useState('');
  const [films, setFilms] = useState<filmPreview[]>([]);
  const filmGenres = ['Horror', 'Comedy', 'Triller'];

  useEffect(() => {
    const fetchFilms = async () => {
      const {data: {results}} = await movieService.getPopular();
      setFilms(results);
    }
    fetchFilms();
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setSeachFilm(event.target.value as string);
  };

  return (
    <>
      <Header/>
      <Container sx={{ mt: '90px', mb: '30px'}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField fullWidth label="Type film name"/>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Choose film genre</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={seachFilm}
                label="Choose film genre"
                onChange={handleChange}
              >
                {filmGenres.map(item => <MenuItem value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {films.map(film => <Grid item xs={4}>
            <FilmPrev {...film}/>
          </Grid>)}
        </Grid>
      </Container>
    </>
  );
}

export default App;
