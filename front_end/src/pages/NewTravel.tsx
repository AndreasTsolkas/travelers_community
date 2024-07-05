import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, Grid, InputLabel, Link, MenuItem, Select, Switch } from "@mui/material";
import MuiTextField from "src/components/MuiTextField";
import axios from "axios";
import { toast } from "react-toastify";
import * as Important from "src/important";
import * as Display from "src/display";
import {getCurrentDate} from "src/datetime";
import { DisplayIconButton, DisplayViewTitle } from "src/display";
import {hasAccessAuth, isAccessTokenNotExpired} from "src/useAuth";
import { httpClient } from "src/requests";


export const NewTravelSchema = yup.object({
  startDate: yup.string().required("Start date is required."),
  endDate: yup.string().required("Finish date is required."),
  country: yup.string().required("Country is required."),
  place: yup.string().required("Place is required."),
  experienceRate: yup.number().required("Experience rate is required."),
  isBusinessTravel: yup.boolean(),
  wouldIsuggestIt: yup.boolean(),
  description: yup.string().max(2000, 'The description must not exceed 2000 characters.').required("Description is required."),
});

const NewTravel = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [defaultCountryId, setDefaultCountryId] = useState<any | null>(null);
  const [defaultSelectedCountryId, setDefaultSelectedCountryId] = useState<any>('');
  const defaultSelectedDate = getCurrentDate(Important.datetimeFormat);
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
      startDate: defaultSelectedDate,
      endDate: defaultSelectedDate+1,
      place: "",
      experienceRate: 5,
      isBusinessTravel: false,
      wouldIsuggestIt: false,
      country: defaultSelectedCountryId
    },
    resolver: yupResolver(NewTravelSchema),
  });

  const onReset = async (data: any) => {
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
    let success = false;
    let response: any = '';

      try {
        response = await httpClient.put(travelUrl, data);
        toast.success('The new travel was created successfully');
        success = true;
      } catch (error) {
        toast.error('New travel creation failed');
      }
    if (success) navigate('/travel/'+response.data.id);
  };

  useEffect(() => {
    getAllCountriesList();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      let defaultCountryId = countries[0];
      setDefaultCountryId(defaultCountryId);
    }
    setDefaultSelectedCountryId(defaultCountryId);
  }, [countries]);

  console.log(defaultSelectedCountryId)
  
  return (
    <div>
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
                name="startDate"
                label="Start datetime"
              />
            </Grid>
            <Grid item xs={4}>
              <MuiTextField
                errors={errors}
                control={control}
                name="endDate"
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
                      value={defaultSelectedCountryId || '' }
                      onChange={(event) => {
                        field.onChange(event);
                        setDefaultSelectedCountryId(event.target.value);
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
                name="isBusinessTravel"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} size="medium" />}
                    label="Business travel"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4.5}>
              <Controller
                name="wouldIsuggestIt"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} size="medium" />}
                    label="Would I suggest it"
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
