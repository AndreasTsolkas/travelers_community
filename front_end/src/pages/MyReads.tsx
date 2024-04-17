import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from 'react';

import {httpClient} from 'src/requests';
import * as Important from 'src/important';
import {DisplayDataGrid} from 'src/display';

export interface IPost {
  id?: number;
  title?: string;
  author?: string;
  gender?: string;
  pages?: number;
  publicationDate?: Date;
  description: string;
}

function MyReads() {

  const [books, setBooks] = useState<IPost[]>([]);

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
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "pages",
      headerName: "Pages",
      flex: 1,
    },
    {
      field: "publicationDate",
      headerName: "Published at",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    
  ];

  async function getAllBooks() {
    const response = await httpClient.get(Important.backEndBaseUrl+'/book/all');
    setBooks(response.data);
  } 

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    console.log(books);
  }, [books]);

  
  return (
    <div>
    <h2>My reads</h2>
    <DisplayDataGrid rows = {books ?? []} columns = {columns}/>
    </div>
  )
}

export default MyReads;
