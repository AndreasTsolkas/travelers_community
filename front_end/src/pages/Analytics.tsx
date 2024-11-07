import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DisplayTitle } from 'src/display';
import { hasAccessAuth } from "src/useAuth";

function Analytics() {
  hasAccessAuth();

  return (
    <div > 
      <DisplayTitle text="Analytics is under construction." />
    </div>
  );
}

export default Analytics;