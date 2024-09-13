import * as React from "react";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MuiTextField from "src/components/MuiTextField";
import MuiSelectField from "src/components/MuiSelectField";
import "src/index.css";
import * as Important from "src/important";
import { httpClient } from "src/requests";
import { useEffect, useState } from "react";
import "../basic.css";

const defaultTheme = createTheme();

const registerSchema = yup.object().shape({
  firstName: yup.string().required("Name is required."),
  lastName: yup.string().required("Surname is required."),
  age: yup
    .number()
    .required("Age is required.")
    .min(15, "You have to be older than 15 years old.")
    .max(120),
  sex: yup.string().required("Sex is required."),
  nationality: yup.string().required("Nationality is required."),
  country: yup.string().required("Country is required."),
  password: yup
    .string()
    .min(4, "Password must have at least 4 characters.")
    .max(20, "The password must not exceed 20 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirmation password should be correct.")
    .required("Confirm the password."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Email must be valid."),
});

type FormData = {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  nationality: string;
  country: string;
  password: string;
  confirmPassword: string;
  email: string;
};

export default function SignUp() {
  const authUrl = Important.authUrl;
  const listUrl = Important.listUrl;
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const accessTokenCookie = Important.accessTokenCookie;
  const [defaultCountry, setDefaultCountry] = useState<any | null>(null);
  const [deafaultSelectedCountry, setDefaultSelectedCountry] =
    useState<any>("");
  const [countries, setCountries] = useState<any[]>([]);
  const [defaultNationality, setDefaultNationality] = useState<any | null>(
    null
  );
  const [deafaultSelectedNationality, setDeafaultSelectedNationality] =
    useState<any>("");
  const [nationalities, setNationalities] = useState<any[]>([]);
  const [defaultSex, setDefaultSex] = useState<any | null>(null);
  const [deafaultSelectedSex, setDeafaultSelectedSex] = useState<any>("");
  const [sexes, setSexes] = useState<any[]>([]);

  React.useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (token) navigate("/");
  }, [navigate]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 20,
      sex: "",
      nationality: "",
      country: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("here");
    const requestUrl = authUrl + "/register";
    try {
      await httpClient.post(requestUrl, data);
      navigate("/signin");
    } catch (error: any) {
      let message = error?.response?.data?.message;
      toast.error(message || "An error occurred");
    }
  };

  const getAllCountriesList = async () => {
    try {
      const response: any = await httpClient.get(listUrl + "/getallcountries");
      setCountries(response.data);
    } catch (error) {
      toast.error("Countries list got failed.");
    }
  };

  const getAllNationalitiesList = async () => {
    try {
      const response: any = await httpClient.get(
        listUrl + "/getallnationalities"
      );
      setNationalities(response.data);
    } catch (error) {
      toast.error("Nationalities list got failed.");
    }
  };

  const getAllSexesList = async () => {
    try {
      const response: any = await httpClient.get(listUrl + "/getallsexes");
      setSexes(response.data);
    } catch (error) {
      toast.error("Sexes list got failed.");
    }
  };

  useEffect(() => {
    getAllCountriesList();
  }, []);

  useEffect(() => {
    getAllNationalitiesList();
  }, []);

  useEffect(() => {
    getAllSexesList();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let defaultCountryGet = countries[0];
      setDefaultSelectedCountry(defaultCountryGet);
    }
  }, [countries]);

  useEffect(() => {
    if (nationalities.length > 0) {
      let defaultNationalityGet = nationalities[0];
      setDeafaultSelectedNationality(defaultNationalityGet);
    }
  }, [nationalities]);

  useEffect(() => {
    if (sexes.length > 0) {
      let defaultSexGet = sexes[0];
      setDeafaultSelectedSex(defaultSexGet);
    }
  }, [sexes]);

  console.log(deafaultSelectedCountry);
  console.log(deafaultSelectedNationality);
  console.log(deafaultSelectedSex);

  return (
    <div className="authentication-pages">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline>
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 124, height: 134, marginBottom: "1.875" }}
                src={Important.appLogoImage}
              />
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box sx={{ mt: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First name*"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last mame*"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Age*"
                            error={!!errors.age}
                            helperText={errors.age?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
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
                        render={({ field }) => (
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
                        render={({ field }) => (
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
                    <Grid item xs={4}>
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              <Select
                                {...field}
                                fullWidth
                                variant="outlined"
                                value={deafaultSelectedCountry || ""}
                                onChange={(event) => {
                                  field.onChange(event);
                                  setDefaultSelectedCountry(event.target.value);
                                }}
                              >
                                {countries.map((item: any) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="nationality"
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              <Select
                                {...field}
                                fullWidth
                                variant="outlined"
                                value={deafaultSelectedNationality || ""}
                                onChange={(event) => {
                                  field.onChange(event);
                                  setDeafaultSelectedNationality(
                                    event.target.value
                                  );
                                }}
                              >
                                {nationalities.map((item: any) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Controller
                        name="sex"
                        control={control}
                        render={({ field }) => {
                          return (
                            <>
                              <Select
                                {...field}
                                fullWidth
                                variant="outlined"
                                value={deafaultSelectedSex || ""}
                                onChange={(event) => {
                                  field.onChange(event);
                                  setDeafaultSelectedSex(event.target.value);
                                }}
                              >
                                {sexes.map((item: any) => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </>
                          );
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    className="icon-button-no-focus"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link fontSize="1.25rem" href="/signin" variant="body2">
                        {" "}
                        Already have an account? Sign in here
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </CssBaseline>
        </Container>
      </ThemeProvider>
    </div>
  );
}
