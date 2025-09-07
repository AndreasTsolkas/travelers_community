import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  CustomBarChart,
  CustomPieChart,
  RankList,
  SummaryCard,
} from "src/components/display/charts";
import { httpClient } from "src/requests";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Important from "src/important";
import { useEffect, useState } from "react";
import { DisplayLoader, DisplayLocalLoader } from "src/display";
export default function Analytics() {
  const navigate = useNavigate();
  const analyticsUrl = Important.analyticsUrl;
  const [totalTravelsNum, setTotalTravelsNum] = useState<string | number | null>(null);
  const [businessTravelsNum, setBusinessTravelsNum] = useState<string | number | null>(
    null
  );
  const [ongoingTravelsNum, setOngoingTravelsNum] = useState<string | number | null>(
    null
  );
  const [displayBasicData, setDisplayBasicData] = useState<any[]>([]);
  const [editprofileRedirectUrl, setEditProfileRedirectUrl] = useState<
    string | null
  >("/editmyprofile");
  const [readyToDisplayPage, setReadyToDisplayPage] = useState<boolean>(false);

  async function getTotalTravelsNumber() {
    try {
      const response: any = await httpClient.get(
        `${analyticsUrl}` + "/travelsnum"
      );
      setTotalTravelsNum(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } 
  }

  async function getOngoingTravelsNumber() {
    try {
      const response: any = await httpClient.get(
        `${analyticsUrl}` + "/ogtravelsnum"
      );
      setOngoingTravelsNum(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  async function getBusinessTravelsNumber() {
    try {
      const response: any = await httpClient.get(
        `${analyticsUrl}` + "/btravelsnum"
      );
      setBusinessTravelsNum(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } 
  }

  useEffect(() => {
    getTotalTravelsNumber();
  }, []);

  useEffect(() => {
    getBusinessTravelsNumber();
  }, []);

  useEffect(() => {
    getOngoingTravelsNumber();
  }, []);

  console.log(totalTravelsNum, businessTravelsNum, ongoingTravelsNum);


  return (
    <Box display="flex" flexDirection="column" gap={4} p={2}>
      <Box>
        {totalTravelsNum!=null && ongoingTravelsNum!=null && businessTravelsNum!=null ? (
          <SummaryCard
            title="Overall state"
            lines={[
              { property: "Total travels", value: { totalTravelsNum } },
              { property: "Business travels", value: { businessTravelsNum } },
              { property: "Ongoing travels", value: { ongoingTravelsNum } },
            ]}
          />
        ) : (
          <DisplayLocalLoader />
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="nowrap"
        gap={2}
      >
        <CustomBarChart title="Bar Chart 1" />
        <CustomBarChart title="Bar Chart 2" />
        <CustomBarChart title="Bar Chart 3" />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="nowrap"
        gap={2}
      >
        <CustomPieChart title="Pie 1" />
        <CustomPieChart title="Pie 2" />
        <CustomPieChart title="Pie 3" />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
        flexWrap="nowrap"
        gap={2}
      >
        <RankList title="Top Ranks" />
        <RankList title="Secondary Ranks" />
        <RankList title="Other Ranks" />
      </Box>
    </Box>
  );
}
