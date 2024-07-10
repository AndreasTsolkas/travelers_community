import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import 'react-toastify/dist/ReactToastify.css';


function Statistics() {

    hasAccessAuth();
    
    return (
      <>
      <DisplayTitle text= {'Statistics'} />
      </>
    )
  }
  
  export default Statistics;