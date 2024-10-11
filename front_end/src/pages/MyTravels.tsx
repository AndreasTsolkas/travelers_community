import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { httpClient } from "src/requests";
import * as Important from "src/important";
import {
  DisplayDataGrid,
  DisplayLoader,
  DisplayTitle,
} from "src/display";
import { hasAccessAuth } from "src/useAuth";
import { IconButton, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
        let redirectLink =
          Important.moreInformationLinkBase + cellValues?.row?.id;
        return (
          <>
            <IconButton className = 'icon-button-no-focus' color='inherit' onClick={() => navigate(redirectLink)}>
              <ReadMoreIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  function setTravelRows(data: any) {
    setRows(
      data.map(
        (travel: {
          id: number;
          place: string;
          country: string;
          dateStarted: Date;
          dateFinished: Date;
          experienceRate: number;
          businessTravel: boolean;
        }) => {
          let isBusinessTravel = "Yes";
          if (travel.businessTravel === false) {
            isBusinessTravel = "No";
          }
          return {
            id: travel.id,
            dateStarted: travel.dateStarted,
            dateFinished: travel.dateFinished,
            place: travel.place,
            country: travel.country,
            businessTravel: isBusinessTravel,
            enjoynessLevel: travel.experienceRate,
          };
        }
      )
    );
  }

  async function getMyTravels() {
    try {
      const response = await httpClient.get(backEndProfileUrl + "/mytravels");
      setTravelRows(response.data);
    } catch (error) {
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 900,
                }}
              >
              </div>
              <DisplayDataGrid rows={rows} columns={columns} title={"My travels"}/>
            </>
          ) : (
            <div>
              <DisplayTitle text={"You have not shared any travels yet."} />
              <Link fontSize="1.25rem" href={"/newtravel"} variant="body2">
                Do you want to share a travel? Click here.
              </Link>
            </div>
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
