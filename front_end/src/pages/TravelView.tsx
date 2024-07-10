import * as Important from "src/important";
import * as Display from "src/display";
import * as Datetime from "src/datetime";
import {DisplayErrorMessage, 
  DisplayViewTitle, 
  DisplayFieldWithTypography, 
  DisplayLoader,
  DisplayIconButton} from 'src/display';
import { hasAccessAuth } from "src/useAuth";
import { httpClient } from "src/requests";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';


function TravelView() {
    const params: any | never = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState<any>();
    const [readyToDisplayPage, setReadyToDisplayPage] = useState<boolean>(false);
    const [displayData, setDisplayData] = useState<any[]>([]);
    const travelId = params?.id;
    const travelUrl = Important.travelUrl;
    const datetimeFormat = Important.datetimeFormat;
    
    hasAccessAuth();
    
    function populateDisplayDataArray() {
    
      if (result) {
        let isBusinessTravel = 'Yes';
        let suggestThisTravel = 'Yes';

        if(result.isBusinessTravel===false) isBusinessTravel = 'No';
        if(!result.suggestThisTravel===false) suggestThisTravel = 'No';
        setDisplayData([
        { key: 'Date started: ', value: Datetime.getDate(result.dateStarted, datetimeFormat) },
        { key: 'Date finished: ', value: Datetime.getDate(result.dateFinished, datetimeFormat) },
        { key: 'Experience rate: ', value: result.experienceRate },
        { key: 'Country: ', value: result.country },
        { key: 'Place: ', value: result.place },
        { key: 'Is business travel: ', value: isBusinessTravel },
        { key: 'Would I suggest it: ', value: suggestThisTravel },
        { key: 'About: ', value: result.description },
      ]);
      }
    }

    async function getCurrentTravel() {
      try {
          const response: any = await httpClient.get(`${travelUrl}/${travelId}`);
          setResult(response.data);
      }
      catch(error: any) {
          console.error(error);
          toast.error(error.response.data.message);
      }
      finally {
        setReadyToDisplayPage(true);
      }
    }


    useEffect(() => {
      getCurrentTravel();
    }, [travelId]);

    useEffect(() => {
      populateDisplayDataArray();
    }, [result]);

    return (
      <>
      {readyToDisplayPage ? (
        <>
          {Display.DisplayIconButton(undefined,navigate)}  {/* Here I pass 'navigate' as an argument to the optional parameter of 'displayIconButton' to avoid conflicts between the 'useNavigate' I use on this file and this that I use into the function I call*/} 
          <DisplayViewTitle text='Travel info: ' />
          <Box
            sx={{
              width: "600px"
            }}
          >
            <div >
              {result ? (
                <div>
                  {displayData.map((item, index) => (
                    <DisplayFieldWithTypography key={index} name = {item.key} data = {item.value} index = {index} />
                  ))}
                </div>
              ) : (
                <DisplayErrorMessage message="Error searching for employee details." />
              )}
            </div>
          </Box>
        </>
      ) : (
        <>
          <DisplayLoader />
        </>
      )}
    </>
    )
  }
  
  export default TravelView;