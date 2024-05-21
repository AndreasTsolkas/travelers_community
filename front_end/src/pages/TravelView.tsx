import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function TravelView() {

    hasAccessAuth();
    
    return (
      <div>
      <DisplayTableTitle text= {'Travel view'} />
      </div>
    )
  }
  
  export default TravelView;