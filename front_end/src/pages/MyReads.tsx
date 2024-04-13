import {httpClient} from 'src/requests';
import * as Important from 'src/important';
import { useEffect, useState } from 'react';

function MyReads() {

  const [books, setBooks] = useState<any>(null);

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
    <h2>My reads</h2>
  )
}

export default MyReads;
