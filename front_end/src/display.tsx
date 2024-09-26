import { DataGrid } from "@mui/x-data-grid";
import { Navigation, useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, IconButton, Modal, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AddIcon from "@mui/icons-material/Add";

import './basic.css';

export function DisplayDataGrid({
  rows,
  columns,
  title
}: {
  rows: any;
  columns: any;
  title:string;
}) {
  const navigate = useNavigate();
  return (
    <Box className='display-table-box'>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: "1.25rem" }}>

        <DisplayTableTitle text={title} />

        <IconButton
          color="inherit"
          onClick={() => navigate(`/newtravel`)}
          sx={{ position: 'absolute', right: 0 }}
          className='icon-button-no-focus'
        >
          <AddIcon />
        </IconButton>
      </div>
  
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        columnVisibilityModel={{
          id: false,
        }}
        style={{borderRadius: '20px'}}
        
      />
    </Box>
  );
}

export function DisplayLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)", 
        zIndex: 9999, 
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export const DisplayFieldWithTypography = ({
  name,
  data,
}: {
  name: any;
  data: any;
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography variant="h6">
          <strong>{name}</strong>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">{data}</Typography>
      </Grid>
    </Grid>
  );
};

export function DisplayErrorMessage({ message }: { message: string }) {
  return <h4>{message}</h4>;
}

export const displayTitleWithTypography = (name: string) => {
  return (
    <Typography variant="h5" gutterBottom>
      {name}
    </Typography>
  );
};

export const displaySmallTitleWithTypography = (name: string) => {
  return (
    <Typography variant="h6" gutterBottom>
      {name}
    </Typography>
  );
};

export const DisplayViewTitle = ({ text }: { text: any }) => {
  return (
    <div
      style={{
        marginTop: "0.9375rem",
        marginBottom: "1.5625rem",
        marginRight:"2rem"
      }}
    >
      {displayTitleWithTypography(text)}
    </div>
  );
};

export const DisplayTableTitle = ({ text }: { text: string }) => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#333', margin: 0 }}>
          {text}
      </Typography>
    </>
  );
};

export const DisplayTitle = ({ text}: { text: string }) => {
  return (
    <div style={{ marginTop: "1.875rem", marginBottom: "1.25rem"}}>
      {displayTitleWithTypography(text)}
    </div>
  );
};

export function DisplayIconButton(specialCase?: any, navigate?: any) {
  if (!navigate) navigate = useNavigate();
  
  let redirectionPath: any = -1;
  if (specialCase) redirectionPath = "/profile";
  
  const iconStyle = {
    cursor: "pointer",
  };
  
  return (
    <div style={{ display: "inline-block", position: "relative", float: "left",  marginLeft: '1rem', marginTop:'0.7rem'}}>
      <ArrowCircleLeftIcon
        onClick={() => navigate(redirectionPath)}
        color='action'
        fontSize="large"
        style={{
          ...iconStyle,
          position: "relative",
        }}
      />
    </div>
  );
}

export const DisplayGenericTitle = ({ text }: { text: any }) => {
  return displayTitleWithTypography(text);
};

export const DisplaySmallGenericTitle = ({ text }: { text: any }) => {
  return displaySmallTitleWithTypography(text);
};

export const DisplayRandomDataList = ({ data}: { data: any[]}) => {
  return (
    <>
       <ol>
        {data.map((item: any, index: any) => (
          <li className="random-data-list" key={index}>
            {Object.entries(item).map(([key, value]) => (
              <div 
                key={key} 
                className='random-data-list-item'>
                <span style={{ textAlign: 'right' }}>{key}</span>
                <span>:</span>
                <span style={{ textAlign: 'left' }}>{String(value)}</span>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </>
  );
};




