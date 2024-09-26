import { DisplayErrorMessage, 
  DisplayFieldWithTypography, 
  DisplayTableTitle, 
  DisplayTitle, 
  DisplayViewTitle, 
  DisplayLoader,
  DisplayRandomDataList } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as Display from "src/display";
import { useEffect, useState } from "react";
import { httpClient } from "src/requests";
import * as Important from 'src/important';

function Suggestions() {
  const [results, setResults] = useState<any | null>(null);
  const [suggestionMethods, setSuggestionMethods] = useState<any>(null);

  hasAccessAuth();

  const navigate = useNavigate();
  const suggestionsUrl = Important.suggestionsUrl;
  const listUrl = Important.listUrl;

  const getSuggestionUrl = (conditionValue: any): string => {
    return suggestionMethods.find((method: any) => method.number === Number(conditionValue))?.getEndpointUrl;
  }

  const getSugesstionsMethodsList  = async () => {
    try {
      const response: any = await httpClient.get(listUrl+'/getsuggestionsmethods');
      setSuggestionMethods(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const getSugesstions = async (endpointPath: string) => {
    try {
      const response: any = await httpClient.get(suggestionsUrl+`${endpointPath}`);
      setResults(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const onChange  = async (event:any) => {
    const suggestionsUrl: string = await getSuggestionUrl(event.target.value);
    console.log(suggestionsUrl);
    try {
      await getSugesstions(suggestionsUrl);
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getSugesstionsMethodsList();
  },[])

  useEffect(() => {
    if (suggestionMethods && suggestionMethods.length > 0) {
      let suggestionsUrl: string = getSuggestionUrl(suggestionMethods[0].number);
      getSugesstions(suggestionsUrl);
    }
  }, [suggestionMethods]); 

  console.log(results);
  

  return (
    <>
      <Box className='display-card-box-special'>
        <DisplayTableTitle text='Suggestions' />
        <form>
          <label className="menu-label" htmlFor="method">Select the method:</label>
          {suggestionMethods ? (
            <select 
              className="select-menu" 
              size={1} 
              name="method" 
              id="method" 
              onChange={onChange}
            >
              {suggestionMethods.map((method: any, index: any) => (
                <option key={index} value={method.number}>
                  {method.name}
                </option>
              ))}
            </select>
          ) : (
            < DisplayLoader />
          )}
        </form>
        <div>
          {results !==null ? (
            <div style={{ marginTop: '70px' }}>
            <DisplayRandomDataList data={results} />
            </div>
          ) : (
            < DisplayLoader />
          )}
        </div>
      </Box>
    </>
  );
}

export default Suggestions;
