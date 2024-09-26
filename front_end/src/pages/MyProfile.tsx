import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as Important from "src/important";
import * as Display from "src/display";
import * as Datetime from "src/datetime";
import {
  DisplayErrorMessage,
  DisplayFieldWithTypography,
  DisplayLoader,
  DisplayTableTitle,
} from "src/display";
import { hasAccessAuth, isAccessTokenNotExpired } from "src/useAuth";
import { httpClient } from "src/requests";
import "react-toastify/dist/ReactToastify.css";
import "../basic.css";

const MyProfile = () => {
  const params: any | never = useParams();
  const navigate = useNavigate();
  const profileUrl = Important.profileUrl;
  const moreInformationLinkBase = Important.moreInformationLinkBase;
  const [userId, setUserId] = useState<number | null>(null);
  const [result, setResult] = useState<any>();
  const [displayBasicData, setDisplayBasicData] = useState<any[]>([]);
  const [editprofileRedirectUrl, setEditProfileRedirectUrl] = useState<
    string | null
  >("/editmyprofile");
  const [readyToDisplayPage, setReadyToDisplayPage] = useState<boolean>(false);

  const datetimeFormat = Important.datetimeFormat;

  hasAccessAuth();

  function populateDisplayBasicDataArray() {
    let sex = "Male";
    if (result) {
      if (result.sex === "F") sex = "Female";
      setDisplayBasicData([
        { key: "Name: ", value: result.firstName },
        { key: "Surname: ", value: result.lastName },
        { key: "Age: ", value: result.age },
        { key: "Sex: ", value: sex },
        { key: "Nationality: ", value: result.nationality },
        { key: "Country: ", value: result.country },
        { key: "Email: ", value: result.email },
        {
          key: "Start datetime: ",
          value: Datetime.getDate(result.dateSigned, datetimeFormat),
        },
      ]);
    }
  }

  async function getProfile() {
    try {
      const response: any = await httpClient.get(`${profileUrl}`);
      setResult(response.data);
      setUserId(response.data.id);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setReadyToDisplayPage(true);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    populateDisplayBasicDataArray();
  }, [result]);

  return (
    <div style={{marginTop:'2.2rem'}}>
      {readyToDisplayPage ? (
        <>
          <Box className='display-card-box'>
          {Display.DisplayIconButton(undefined, navigate)}
          <Display.DisplayViewTitle text={"My Profile"} />
            <div>
              {result ? (
                <div>
                  {displayBasicData.map((item, index) => (
                    <DisplayFieldWithTypography
                      key={`basic-${index}`}
                      name={item.key}
                      data={item.value}
                    />
                  ))}
                </div>
              ) : (
                <DisplayErrorMessage message="Error searching for profile." />
              )}
            </div>
          </Box>
          <div style={{ marginTop: "1.1875rem" }}>
            <Link
              style={{ fontSize: "1.3rem", color: 'inherit' }}
              to={editprofileRedirectUrl !== null ? editprofileRedirectUrl : ""}
            >
              Edit profile
            </Link>
          </div>
        </>
      ) : (
        <>
          <DisplayLoader />
        </>
      )}
      </div>
  );
};

export default MyProfile;
