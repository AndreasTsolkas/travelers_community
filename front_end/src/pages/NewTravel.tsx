import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function NewTravel() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTableTitle text= {'New read'} />
      </div>
    )
  }
  
  export default NewTravel;