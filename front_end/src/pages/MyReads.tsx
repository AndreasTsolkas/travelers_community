import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from 'react';

import {httpClient} from 'src/requests';
import * as Important from 'src/important';
import {DisplayDataGrid, DisplayLoader, DisplayTableTitle} from 'src/display';
import { hasAccessAuth } from "src/useAuth";

export interface IPost {
  id?: number;
  title?: string;
  author?: string;
  dateStarted?: Date;
  dateFinished?: Date;
  enjoynessLevel?: string;
}

function MyReads() {

  const [rows, setRows] = useState<IPost[]>([]);
  const [readyToDisplayPage, setReadyToDisplayPage] = useState<boolean>(false);

  const backEndProfileUrl = Important.backEndProfileUrl;

  hasAccessAuth();

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "dateStarted",
      headerName: "Date started",
      flex: 1,
    },
    {
      field: "dateFinished",
      headerName: "Date finished",
      flex: 1,
    },
    {
      field: "enjoynessLevel",
      headerName: "Enjoyness level",
      flex: 1,
    },
    
  ];

  function setReadRows(data: any) {
    setRows(
      data.map(
        (hasRead: { id: any; book: any, dateStarted: any; dateFinished: any; enjoynessLevel: any;   }) => {
          return {
            id: hasRead.id,
            title: hasRead.book.title,
            author: hasRead.book.author,
            dateStarted: hasRead.dateStarted,
            dateFinished: hasRead.dateFinished,
            enjoynessLevel: hasRead.enjoynessLevel
          };
        }
      )
    );
  }

  async function getAllBooks() {
    try {
      const response = await httpClient.get(backEndProfileUrl+'/myreads');
      setReadRows(response.data);
    }
    catch(error) {
      console.error(error);
    }
    setReadyToDisplayPage(true);
  } 

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  
  return (
    <div>
    {readyToDisplayPage ? (
        <>
    <DisplayTableTitle text= {'My reads'} />
    <DisplayDataGrid rows = {rows ?? []} columns = {columns}/>
    </>
    ) : (
      <>
        <DisplayLoader />
      </>
    )}
    </div>
  )
}

export default MyReads;
