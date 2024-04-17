import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function DisplayDataGrid({rows, columns}:{rows: any, columns: any}) {
    return (
    <Box sx={{ height: 500, width: 900 }}>
       <DataGrid
        rows={rows ?? []}
        columns={columns}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </Box>
    );
}

export function DisplayLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
}