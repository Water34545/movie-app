import { useState } from 'react';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login && login({username, password});
  }

  return <Container sx={{ mt: '90px', mb: '30px'}}>
    <CssBaseline />
    <Box sx={{marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',}}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal"
          value={username}
          onChange={({target: {value}}) => setUsername(value)}
          required
          fullWidth
          label="Account"
          autoFocus />
        <TextField margin="normal"
          value={password}
          onChange={({target: {value}}) => setPassword(value)}
          required
          fullWidth
          label="Password"
          type="password"/>
        <Button type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </Box>
  </Container>
}

export default LoginPage;