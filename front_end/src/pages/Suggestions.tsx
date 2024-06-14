import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Suggestions() {

  hasAccessAuth(); 
  
  return (
    <div>
    <DisplayTitle text= {'Suggestions'} />
    </div>
  )
}

export default Suggestions;
