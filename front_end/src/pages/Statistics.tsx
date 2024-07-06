import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function Statistics() {

    hasAccessAuth();
    
    return (
      <>
      <DisplayTitle text= {'Statistics'} />
      </>
    )
  }
  
  export default Statistics;