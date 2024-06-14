import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Statistics() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTitle text= {'Statistics'} />
      </div>
    )
  }
  
  export default Statistics;