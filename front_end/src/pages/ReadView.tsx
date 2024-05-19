import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function ReadView() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTableTitle text= {'Read view'} />
      </div>
    )
  }
  
  export default ReadView;