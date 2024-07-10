import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, Link, MenuItem, Select, Switch, TextField } from "@mui/material";
import MuiTextField from "src/components/MuiTextField";
import axios from "axios";
import { toast } from "react-toastify";
import * as Important from "src/important";
import * as Display from "src/display";
import {getCurrentDate, getDateFromCurrentDate, convertDatestringToDate} from "src/datetime";
import { DisplayIconButton, DisplayViewTitle } from "src/display";
import {hasAccessAuth, isAccessTokenNotExpired} from "src/useAuth";
import { httpClient } from "src/requests";


export const NewTravelSchema = yup.object({
  dateStarted: yup.string().required("Start date is required."),
  dateFinished: yup.string().required("Finish date is required."),
  country: yup.string().required("Country is required."),
  place: yup.string().required("Place is required."),
  experienceRate: yup.number().required("Experience rate is required."),
  businessTravel: yup.boolean(),
  suggestIt: yup.boolean(),
  description: yup.string().max(2000, 'The description must not exceed 2000 characters.').required("Description is required."),
});

const NewTravel = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [defaultCountry, setDefaultCountry] = useState<any | null>(null);
  const [defaultSelectedCountry, setDefaultSelectedCountry] = useState<any>('');
  const defaultSelectedStartDate = getCurrentDate(Important.datetimeFormat);
  const defaultSelectedEndDate = getDateFromCurrentDate(1, 'DD/ MM/ YYYY');
  const navigate = useNavigate();
  const travelUrl = Important.travelUrl;
  const profileUrl = Important.profileUrl;
  const [formTitle, setFormTitle] = useState<string>('Add a new travel:');

  
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
      dateStarted: defaultSelectedStartDate,
      dateFinished: defaultSelectedEndDate,
      place: "",
      experienceRate: 5,
      businessTravel: false,
      suggestIt: true,
      country: defaultSelectedCountry
    },
    resolver: yupResolver(NewTravelSchema),
  });

  const onReset = async (data: any) => {
    setDefaultSelectedCountry(defaultCountry);
    setValue('country', countries[0]);
    reset(data);
  }

  const getAllCountriesList = async () => {
    try {
      const response: any = await httpClient.get(profileUrl+'/getallcountries');
      console.log("countries: "+response);
      setCountries(response.data);
    }
    catch(error) {
      toast.error('Countries list get failed.');
    }
  }

  const onSubmit =  async (data: any) => {
    if(data.country==='')
      data.country = countries[0].id;
    data.dateStarted = convertDatestringToDate(data.dateStarted);
    data.dateFinished = convertDatestringToDate(data.dateFinished);
    let success = false;
    let response: any = '';

      try {
        response = await httpClient.put(profileUrl+'/newtravel', data);
        toast.success('The new travel was created successfully');
        success = true;
      } catch (error) {
        toast.error('New travel creation failed');
      }
    if (success) navigate('/travelview/'+response.data.id);
  };

  useEffect(() => {
    getAllCountriesList();
  }, []);

  useEffect(() => {
    setValue('country', countries[0]);
  }, [countries]);

  useEffect(() => {
    if (countries.length > 0) {
      let defaultCountry = countries[0];
      setDefaultCountry(defaultCountry);
    }
    setDefaultSelectedCountry(defaultCountry);
  }, [countries]);

  
  return (
    <div style={{marginTop: "65px"}}>
      {Display.DisplayIconButton()}
      <DisplayViewTitle text={formTitle} />
      <Box
        sx={{
          width: "500px",
          marginTop:"30px"
        }}
      >
        <form  onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
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
                render={ ({ field }) => {
                     
                  return (
                  <>
                    <Select
                      {...field}
                      fullWidth
                      variant="outlined"
                      value={defaultSelectedCountry || '' }
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
                );}}
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
                    control={<Checkbox {...field} checked={field.value} size="medium" />}
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
                    control={<Checkbox {...field} checked={field.value} size="medium" />}
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
                    helperText={errors.description ? errors.description.message : ''}
                  />
                )}
              />
            </Grid>
            
            
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "20px" }}
          >
            Reset
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default NewTravel;
