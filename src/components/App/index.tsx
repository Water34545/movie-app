import {useState} from 'react';
import Header from '../Header';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const App = () => {
  const [seachFilm, setSeachFilm] = useState('');
  const filmGenres = ['Horror', 'Comedy', 'Triller']

  const handleChange = (event: SelectChangeEvent) => {
    setSeachFilm(event.target.value as string);
  };

  return (
    <div className="App">
      <Header/>
      <Container sx={{ mt: '20px' }}>
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
      </Container>
    </div>
  );
}

export default App;
