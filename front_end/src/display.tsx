import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export function DisplayDataGrid({rows, columns}:{rows: any, columns: any}) {
    return (
    <Box sx={{ height: 500, width: 900 }}>
       <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }],
          },
        }}
        pageSizeOptions={[5, 10]}
        columnVisibilityModel={{
            id: false,
          }}
        checkboxSelection
      />
    </Box>
    );
}