import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import 'react-toastify/dist/ReactToastify.css';


function Website() {

  hasAccessAuth(); 
  
  return (
    <>
    <DisplayTitle text= {'Website'} />
    </>
  )
}

export default Website;
