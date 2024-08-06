import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import 'react-toastify/dist/ReactToastify.css';


function Analytics() {

    hasAccessAuth();
    
    return (
      <>
      <DisplayTitle text= {'Analytics'} />
      </>
    )
  }
  
  export default Analytics;