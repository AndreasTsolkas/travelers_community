import { useState } from 'react';
import { DisplayTitle } from 'src/display';
import { hasAccessAuth } from "src/useAuth";
import { BarChart } from '@mui/x-charts/BarChart';

function Analytics() {
  hasAccessAuth();

  return (
    <div > 
      <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: ['bar A', 'bar B', 'bar C'],
    },
  ]}
  series={[
    {
      data: [2, 5, 3],
    },
  ]}
  height={300}
  width={200}
/>
    </div>
  );
}

export default Analytics;