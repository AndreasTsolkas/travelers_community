import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function NewRead() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTableTitle text= {'New read'} />
      </div>
    )
  }
  
  export default NewRead;