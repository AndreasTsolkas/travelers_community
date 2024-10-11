import { DisplayTableTitle,
  DisplayLoader,
  DisplayRandomDataList } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import 'src/css/pages.css';
import { useEffect, useState } from "react";
import { httpClient } from "src/requests";
import * as Important from 'src/important';
import {limits} from 'src/interfaces/result.limits.interface'

function Suggestions() {
  const [results, setResults] = useState<any | null>(null);
  const [suggestionMethods, setSuggestionMethods] = useState<any | null>(null);
  const [resultLimitValue, setResultLimitValue] = useState<number | null>(null);
  const [methodPathValue, setMethodPathValue] = useState<string | null>(null);

  hasAccessAuth();

  const suggestionsUrl = Important.suggestionsUrl;
  const listUrl = Important.listUrl;

  const getSuggestionUrl = (conditionValue: any): string => {
    return suggestionMethods.find((method: any) => method.number === Number(conditionValue))?.getEndpointUrl;
  }

  const getSuggestionsMethodsList  = async () => {
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
      const queryParams = {
        limit: resultLimitValue
      };
      const response: any = await httpClient.get(suggestionsUrl+`${endpointPath}`, queryParams);
      setResults(response.data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const onChange  = async (event:any) => {
    if(event.target.name === 'method') {
      const suggestionsUrl: string = await getSuggestionUrl(event.target.value);
      setMethodPathValue(suggestionsUrl);
    }
    else if(event.target.name === 'limit') 
      setResultLimitValue(event.target.value);
  }

  useEffect(() =>{
    getSuggestionsMethodsList();
  },[])

  useEffect(() => {
    setResultLimitValue(limits.values[0])
  }, []); 

  useEffect(() => {
    if (suggestionMethods && suggestionMethods.length > 0) {
      let suggestionsUrl: string = getSuggestionUrl(suggestionMethods[0].number);
      setMethodPathValue(suggestionsUrl);
    }
  }, [suggestionMethods]); 

  useEffect(() => {
    if(methodPathValue && resultLimitValue!==null)
      getSugesstions(methodPathValue);
  }, [methodPathValue, resultLimitValue]); 

  
  return (
    <>
      <Box className='display-card-box-special'>
        <DisplayTableTitle text='Suggestions' />
        <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            {suggestionMethods ? (
              <>
                <select 
                  className="select-menu" 
                  size={1} 
                  name="method" 
                  id="method-select" 
                  onChange={onChange}
                  style={{ marginRight: '10px' }} 
                >
                  <option value="" disabled selected>Select a method</option> 
                  {suggestionMethods.map((method: any, index: any) => (
                    <option key={index} value={method.number}>
                      {method.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <DisplayLoader />
            )}

            <select 
              className="select-menu" 
              size={1} 
              name="limit" 
              id="limit-select" 
              onChange={onChange}
              style={{ marginLeft: '10px' }} 
            >
              <option value="" disabled selected>Select a limit</option> 
              {limits.values.map((item: any, index: any) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
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
