import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ScheduledTasks from "src/scheduled_tasks";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScheduledTasks />
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
