import * as React from 'react';
import * as yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CookiesProvider, useCookies } from "react-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormControl, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import MuiTextField from "src/components/MuiTextField";
import MuiSelectField from "src/components/MuiSelectField";
import "src/index.css";
import * as Important from "src/important";
import { Link as RouterLink } from 'react-router-dom';
import { httpClient } from 'src/requests';




const defaultTheme = createTheme();

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  surname: yup.string().required("Surname is required."),
  username: yup.string().required("Username is required."),
  email: yup.string().required("Email is required.").email("Email must be valid."),
  age: yup.number().required("Age is required."),
  nationality: yup.string().required("Nationality is required."),
  country: yup.string().required("Country is required."),
  avatarImage: yup.string().required("Avatar image is required."),
  password: yup.string().min(4,'Password must have at least 4 characters.').max(20, 'The password must not exceed 20 characters.').required("Password is required."),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Confirmation password should be correct.').required("Confirm the password."),
  
});



export default function SignUp() {

  const authUrl = Important.authUrl;
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const accessTokenCookie = Important.accessTokenCookie;

  React.useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (token) 
      navigate('/');
  }, [navigate]);

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    
  });

  const onSubmit = async (data: any) => {  
    data.isAccepted=false;
    data.isAdmin=false;
    data.department=null;
    data.salary=0;
    data.vacationDays=0;
    const requestUrl = authUrl+'/register';
    try {
      const response = await httpClient.post(requestUrl, data );  
      navigate('/signin');
    } catch(error: any) {
      let message=error?.response?.data?.message;
      toast.error(message || 'An error occurred');
    }
  };

  return (
    <div className='authentication-pages'>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline>
        <Box sx={{marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
        <Avatar sx={{ width: 124, height: 134, marginBottom: '30px' }}
        src={Important.appLogoImage} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
         <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }:{field:any}) => (
                    <TextField
                      {...field}
                      label="Name*"
                      error={!!errors.name}
                      helperText={errors.surname?.message}
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
              <Controller
                  name="surname"
                  control={control}
                  defaultValue=""
                  render={({ field }:{field:any}) => (
                    <TextField
                      {...field}
                      label="Surname*"
                      error={!!errors.surname}
                      helperText={errors.surname?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} >
              <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }:{field:any}) => (
                    <TextField
                      {...field}
                      label="Username*"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }:{field:any}) => (
                  <TextField
                    {...field}
                    label="Email*"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                )}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }:{field:any}) => (
                  <TextField
                    {...field}
                    label="Password*"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                  />
                )}
              />
              </Grid>
              <Grid item xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }:{field:any}) => (
                  <TextField
                    {...field}
                    label="Confirm password*"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    fullWidth
                  />
                )}
              />
              </Grid> 
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link fontSize="20px" href="/signin" variant="body2">
                Already have an account? Sign in here
                </Link>
              </Grid>
            </Grid>
          </Box> 
        </Box>
        </CssBaseline>
      </Container>
    </ThemeProvider>
    </div>
  );
}