import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function NewTravel() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTitle text= {'New read'} />
      </div>
    )
  }
  
  export default NewTravel;