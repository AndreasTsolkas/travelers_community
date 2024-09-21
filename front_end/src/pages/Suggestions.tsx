import { DisplayErrorMessage, DisplayFieldWithTypography, DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as Display from "src/display";
import { useEffect, useState } from "react";
import { httpClient } from "src/requests";
import * as Important from 'src/important';

function Suggestions() {
  const [results, setResults] = useState<any>(null);
  const [suggestionMethods, setSuggestionMethods] = useState<any>(null);

  hasAccessAuth();

  const navigate = useNavigate();
  const suggestionsUrl = Important.suggestionsUrl;
  const listUrl = Important.listUrl;

  const getSugesstionsMethodsList  = async () => {
    try {
      const response: any = await httpClient.get(listUrl+'/getsuggestionsmethods');
      setSuggestionMethods(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const getSugesstions  = async () => {
    try {
      const response: any = await httpClient.get(suggestionsUrl+'/getmethods');
      setResults(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const onChange  = async (event:any) => {
    console.log(event.target.value)
    const getSuggestionsUrl = suggestionMethods.find((method: any) => method.number === Number(event.target.value))?.getEndpointUrl;
    console.log(getSuggestionsUrl);
    try {
      const response: any = await httpClient.get(suggestionsUrl+`${getSuggestionsUrl}`);
      setResults(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getSugesstionsMethodsList();
  },[])

  console.log(suggestionMethods);
  

  return (
    <>
      <Box className='display-card-box'>
      {Display.DisplayIconButton(undefined, navigate)}
      <Display.DisplayViewTitle text={"Suggestions"} />
      <form onChange={onChange}>
        <label className="menu-label" htmlFor="method">Select the method:  </label>
          {suggestionMethods ? (
          <select className="select-menu" size={1} name="method" id="method">
            {suggestionMethods.map((method: any, index:any) => (
              <option key={index} value={method.number}>
                {method.name}
              </option>
            ))}
          </select>
        ) : (
          <DisplayErrorMessage message="Error searching for suggestion methods." />
        )}
      </form>
      </Box>
    </>
  );
}

export default Suggestions;
