import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Statistics() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTableTitle text= {'Statistics'} />
      </div>
    )
  }
  
  export default Statistics;