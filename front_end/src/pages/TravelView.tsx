import { DisplayTableTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import {DisplayCard} from "src/display";

function TravelView() {

    hasAccessAuth();
    
    return (
      <>
      <DisplayTableTitle text= {'Travel view'} />
      <DisplayCard content = {"Card content "} />
      </>
    )
  }
  
  export default TravelView;