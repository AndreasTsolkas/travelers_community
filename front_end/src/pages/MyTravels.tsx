import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {httpClient} from 'src/requests';
import * as Important from 'src/important';
import {DisplayDataGrid, DisplayLoader, DisplayTableTitle, DisplayTitle} from 'src/display';
import { hasAccessAuth } from "src/useAuth";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';


export interface IPost {
  place?: string;
  country?: string;
  dateStarted?: Date;
  dateFinished?: Date;
  isBusinessTravel?: Boolean;
  description?: string;
  experienceRate?: number;
  wouldISuggestIt?: Boolean;

}

function MyTravels() {

  const navigate = useNavigate();
  const [rows, setRows] = useState<IPost[]>([]);
  const [readyToDisplayPage, setReadyToDisplayPage] = useState<boolean>(false);

  const backEndProfileUrl = Important.backEndProfileUrl;

  hasAccessAuth();

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", flex: 1 },
    {
      field: "place",
      headerName: "Place",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "dateStarted",
      headerName: "Date started",
      flex: 1,
    },
    {
      field: "dateFinished",
      headerName: "Date finished",
      flex: 1,
    },
    {
      field: "businessTravel",
      headerName: "Business travel",
      flex: 1,
    },
    {
      field: "enjoynessLevel",
      headerName: "Enjoyness level",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "More info",
      flex: 0.5,
      renderCell: (cellValues: any) => {
        let redirectLink = Important.moreInformationLinkBase+cellValues?.row?.id;
        return (
          <>
            <IconButton
              color="primary"
              onClick={() => navigate(redirectLink)}
            >
              <ReadMoreIcon />
            </IconButton>
          </>
        );
      }
     },
    
  ];

  function setTravelRows(data: any) {
    
    setRows(
      data.map(
        (travel: { id: any; place: any, country: any, dateStarted: any; dateFinished: any; 
          experienceRate: any; businessTravel: any}) => {
          let isBusinessTravel = 'Yes';
          if(travel.businessTravel===false) {
            isBusinessTravel = 'No';
          }
          return {
            id: travel.id,
            dateStarted: travel.dateStarted,
            dateFinished: travel.dateFinished,
            place: travel.place,
            country: travel.country,
            businessTravel: isBusinessTravel,
            enjoynessLevel: travel.experienceRate
          };
        }
      )
    );
  }

  async function getMyTravels() {
    try {
      const response = await httpClient.get(backEndProfileUrl+'/mytravels');
      setTravelRows(response.data);
    }
    catch(error) {
      console.error(error);
    }
    setReadyToDisplayPage(true);
  } 

  useEffect(() => {
    getMyTravels();
  }, []);

  
  return (
    <div>
      {readyToDisplayPage ? (
        <>
          {rows.length > 0 ? (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 900,
                }}
              >
                <DisplayTableTitle text={'My travels'} />
                <IconButton color="primary" onClick={() => navigate(`/newtravel`)}>
                  <AddIcon />
                </IconButton>
              </div>
              <DisplayDataGrid rows={rows} columns={columns} />
            </>
          ) : (
            <DisplayTitle text= {'You have not shared any travels yet.'} />
          )}
        </>
      ) : (
        <>
          <DisplayLoader />
        </>
      )}
    </div>
  );
}

export default MyTravels;
