import * as React from "react";
import { Box} from "@mui/material";
import {CustomBarChart, CustomPieChart, RankList, SummaryCard}  from "src/components/display/charts";


export default function Analytics() {
  return (
    <Box display="flex" flexDirection="column" gap={4} p={2}>

      <SummaryCard />
      {/* First row: 3 bar charts */}
      <Box display="flex" flexDirection="row" justifyContent="space-between" flexWrap="nowrap" gap={2}>
        <CustomBarChart title="Bar Chart 1" />
        <CustomBarChart title="Bar Chart 2" />
        <CustomBarChart title="Bar Chart 3" />
      </Box>

      {/* Second row: 3 pie charts */}
      <Box display="flex" flexDirection="row" justifyContent="space-between" flexWrap="nowrap" gap={2}>
        <CustomPieChart title="Pie 1" />
        <CustomPieChart title="Pie 2" />
        <CustomPieChart title="Pie 3" />
      </Box>

      {/* Third row: rank list */}
      <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="nowrap" gap={2}>
        <RankList title="Top Ranks" />
        <RankList title="Secondary Ranks" />
        <RankList title="Other Ranks" />
      </Box>
    </Box>
  );
}
