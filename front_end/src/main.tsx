import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "src/css/global.css";
import { BrowserRouter } from "react-router-dom";
import ScheduledTasks from "src/scheduled_tasks";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScheduledTasks />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  </React.StrictMode>
);
