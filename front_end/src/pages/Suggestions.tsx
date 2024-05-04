import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Suggestions() {

  hasAccessAuth(); 
  
  return (
    <div>
    <DisplayTableTitle text= {'Suggestions'} />
    </div>
  )
}

export default Suggestions;
