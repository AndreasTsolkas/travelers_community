import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MuiTextField from "src/components/MuiTextField";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import * as Important from "src/important";
import * as Display from "src/display";
import {
  getCurrentDate,
  getDateFromCurrentDate,
  convertDatestringToDate,
} from "src/datetime";
import { DisplayViewTitle } from "src/display";
import { httpClient } from "src/requests";
import "src/css/pages.css";

export const NewTravelSchema = yup.object({
  dateStarted: yup.string().required("Start date is required."),
  dateFinished: yup.string().required("Finish date is required."),
  country: yup.string().required("Country is required."),
  place: yup.string().required("Place is required."),
  experienceRate: yup.string().required("Experience rate is required."),
  businessTravel: yup.boolean(),
  suggestIt: yup.boolean(),
  description: yup
    .string()
    .max(2000, "The description must not exceed 2000 characters.")
    .required("Description is required."),
});

const NewTravel = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [defaultCountry, setDefaultCountry] = useState<string | null>(null);
  const [defaultSelectedCountry, setDefaultSelectedCountry] = useState<any>("");
  const defaultSelectedStartDate = getCurrentDate(Important.datetimeFormat);
  const defaultSelectedEndDate = getDateFromCurrentDate(1, "DD/ MM/ YYYY");
  const navigate = useNavigate();
  const profileUrl = Important.profileUrl;
  const listUrl = Important.listUrl;
  const [formTitle, setFormTitle] = useState<string>("Add a new travel:");

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      dateStarted: defaultSelectedStartDate,
      dateFinished: defaultSelectedEndDate,
      place: "",
      experienceRate: "",
      businessTravel: false,
      suggestIt: true,
      country: defaultSelectedCountry,
    },
    resolver: yupResolver(NewTravelSchema),
  });

  const onReset = async (data: any) => {
    setDefaultSelectedCountry(defaultCountry);
    setValue("country", countries[0]);
    reset(data);
  };

  const getAllCountriesList = async () => {
    try {
      const response: any = await httpClient.get(listUrl + "/getallcountries");
      console.log("countries: " + response);
      setCountries(response.data);
    } catch (error) {
      toast.error("Countries list get failed.");
    }
  };

  const onSubmit = async (data: any) => {
    if (data.country === "") data.country = countries[0].id;
    data.dateStarted = convertDatestringToDate(data.dateStarted);
    data.dateFinished = convertDatestringToDate(data.dateFinished);
    let success = false;
    let response: any = "";

    try {
      response = await httpClient.put(profileUrl + "/newtravel", data);
      toast.success("The new travel was created successfully");
      success = true;
    } catch (error) {
      toast.error("New travel creation failed");
    }
    if (success) navigate("/travelview/" + response.data.id);
  };

  useEffect(() => {
    getAllCountriesList();
  }, []);

  useEffect(() => {
    setValue("country", countries[0]);
  }, [countries]);

  useEffect(() => {
    if (countries.length > 0) {
      let defaultCountry = countries[0];
      setDefaultCountry(defaultCountry);
    }
    setDefaultSelectedCountry(defaultCountry);
  }, [countries]);

  return (
    <>
      
      <Box
        sx={{
          marginTop: "2.2rem",
        }}
        className='display-form-box'
      >
        {Display.DisplayIconButton()}
        <DisplayViewTitle text={formTitle} />
        <form onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="dateStarted"
                label="Start datetime"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="dateFinished"
                label="End datetime"
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
                        value={defaultSelectedCountry || ""}
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
              <MuiTextField
                errors={errors}
                control={control}
                name="place"
                label="Place"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="experienceRate"
                label="Experience rate"
              />
            </Grid>
            <Grid item xs={4.5}>
              <Controller
                name="businessTravel"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        size="medium"
                      />
                    }
                    label="Business travel"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4.5}>
              <Controller
                name="suggestIt"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        size="medium"
                      />
                    }
                    label="Would I suggest it"
                  />
                )}
              />
            </Grid>

            <Grid item xs={15}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    fullWidth
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button color='inherit' className = 'icon-button-no-focus' type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>
          <Button
            className = 'icon-button-no-focus'
            color="inherit"
            type="reset"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "1.25rem" }}
          >
            Reset
          </Button>
        </form>
      </Box>
    </>
  );
};

export default NewTravel;
