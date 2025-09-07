import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import React from "react";

export function CustomBarChart({ title }: { title: string }) {
  const salesData = [120, 200, 150, 80, 70, 110, 130];
  const usersData = [90, 140, 100, 60, 50, 95, 120];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ width: 350 }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <BarChart
        height={300}
        series={[
          { data: salesData, label: "Sales", id: "salesId" },
          { data: usersData, label: "Users", id: "usersId" },
        ]}
        xAxis={[{ data: labels, scaleType: "band" }]}
        yAxis={[{ width: 50 }]}
      />
    </div>
  );
}

export function CustomPieChart({ title }: { title: string }) {
  return (
    <div style={{ width: 220 }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Series A" },
              { id: 1, value: 15, label: "Series B" },
              { id: 2, value: 20, label: "Series C" },
            ],
          },
        ]}
        width={200}
        height={200}
      />
    </div>
  );
}

export function RankList({ title }: { title: string }) {
  const ranks = [
    { name: "Alice", score: 95 },
    { name: "Bob", score: 88 },
    { name: "Charlie", score: 80 },
    { name: "David", score: 75 },
    { name: "Eve", score: 70 },
  ];

  return (
    <Box sx={{ width: 350, border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {title}
      </Typography>
      <List>
        {ranks.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`${index + 1}. ${item.name}`}
                secondary={`Score: ${item.score}`}
              />
            </ListItem>
            {index < ranks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

function SummaryCardLine({ property, value }: { property: string; value: any }) {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body1">{property}:</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
}

export function SummaryCard({
  title,
  lines,
}: {
  title: string;
  lines: { property: string; value: any }[];
}) {
  console.log(lines);
  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          {lines.map((line, index) => (
            <SummaryCardLine
              key={index}
              property={line.property}
              value={line.value}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

