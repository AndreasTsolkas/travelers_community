import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Suggestions() {

  hasAccessAuth(); 
  
  return (
    <>
    <DisplayTitle text= {'Suggestions'} />
    </>
  )
}

export default Suggestions;
