import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fnLoginMutaton } from '../api';
import { websiteTheme } from '../config/theme';
import { useSetRecoilState } from 'recoil';
import {authUserState} from '../recoilStore';
import { useRecoilValue } from 'recoil';
import { CopyRight } from '../components/CopyRight';



  

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const setAuthUser = useSetRecoilState(authUserState);
    const authUser = useRecoilValue(authUserState);
    

    const loginMutation = useMutation({
        mutationFn: fnLoginMutaton,
        onSuccess: (res) => {
            console.log(res);

            const accessToken = res.access_token;
            const refreshToken = res.refresh_token;                
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const authUserVal = {
                id : res.user.id,
                name : res.user.name,
                email : res.user.email,
                accessToken : res.accessToken,
                refreshToken : res.refreshToken,
                loginStatus : true
            };
            setAuthUser(authUserVal);
            console.log(authUser);


        },
        onError: (err) => {
            console.log(err.response.data.messages);
            setFormError(err.response.data.messages.request_msg);
        }
    
    });


    




    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            email : email,
            password : password
        };

        setFormError('');
        loginMutation.mutate(payload);
        


    }



  return (
    <ThemeProvider theme={websiteTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=> setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Typography variant="body2" color="error.main" align="center" sx={{ my : 1}} fontSize="11">
              {formError}
            </Typography>
              
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <CopyRight sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  );
}

export default Login