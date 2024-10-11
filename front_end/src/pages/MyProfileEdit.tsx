import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import MuiTextField from "src/components/MuiTextField";
import axios from "axios";
import { toast } from "react-toastify";
import * as Important from "src/important";
import * as Display from "src/display";
import { DisplayIconButton, DisplayViewTitle } from "src/display";
import { hasAccessAuth, isAccessTokenNotExpired } from "src/useAuth";
import { httpClient } from "src/requests";
import "react-toastify/dist/ReactToastify.css";
import "src/css/pages.css"

export const NewEmployeeSchema = yup.object({
  username: yup.string().required("Username is required.").min(2).max(20),
  firstName: yup.string().required("Name is required.").min(2).max(20),
  lastName: yup.string().required("Surname is required.").min(2).max(20),
  email: yup.string().email().required("Email is required."),
  country: yup.string().required("Country is required."),
});

const MyProfileEdit = () => {
  const params = useParams();
  const [defaultCountry, setDefaultCountry] = useState<any | null>(null);
  const [deafaultSelectedCountry, setDefaultSelectedCountry] =
    useState<any>("");
  const [countries, setCountries] = useState<any[]>([]);
  const navigate = useNavigate();
  const profileUrl = Important.profileUrl;
  const listUrl = Important.listUrl;
  const [formTitle, setFormTitle] = useState<string>("Edit your profile");

  const passwordRedirectUrl = Important.passwordUrl;

  hasAccessAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: deafaultSelectedCountry,
    },
    resolver: yupResolver(NewEmployeeSchema),
  });

  const onReset = async (data: any) => {
    setDefaultSelectedCountry("");
    reset(data);
    await getProfile();
    await getAllCountriesList();
  };

  const onSubmit = async (data: any) => {
    if (data.country === "") data.country = countries[0].id;
    let success = false;
    let response: any = "";
    try {
      response = await httpClient.patch(`${profileUrl}`, data);
      toast.success("Profile updated successfully");
      success = true;
    } catch (error) {
      toast.error("Profile update failed");
    }
    if (success) navigate("/myprofile");
  };

  const getProfile = async () => {
    return await httpClient
      .get(`${profileUrl}`)
      .then((response) => {
        reset(response.data);
        if (response.data.country !== null)
          setDefaultCountry(response.data.country);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  const getAllCountriesList = async () => {
    try {
      const response: any = await httpClient.get(listUrl + "/getallcountries");
      setCountries(response.data);
    } catch (error) {
      toast.error("Countries list get failed.");
    }
  };

  useEffect(() => {
    getAllCountriesList();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let defaultCountryGet = defaultCountry;
      setDefaultSelectedCountry(defaultCountryGet);
    }
  }, [countries]);

  return (
    <>
      
      <Box
        sx={{
          marginTop: "2.2rem",
        }}
        className = 'display-form-box'
      >
        {Display.DisplayIconButton()}
        <DisplayViewTitle text={formTitle} />
        <div style={{marginTop: '70px'}}>
        <form onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="firstName"
                label="First name"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="lastName"
                label="Last name"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="email"
                label="Email"
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
          </Grid>
          <Button color='inherit' className = 'icon-button-no-focus' type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Button
            className = 'icon-button-no-focus'
            type="reset"
            color='inherit'
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "1.25rem" }}
          >
            Reset
          </Button>
        </form>
        </div>
      </Box>
      <div style={{ marginTop: "0.625rem" }}>
        <Link style={{color: 'inherit'}} fontSize="1.25rem" href={passwordRedirectUrl} variant="body2">
          Do you want to change your password? Click here.
        </Link>
      </div>
    </>
  );
};

export default MyProfileEdit;
