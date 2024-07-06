import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function MyStatistics() {

  hasAccessAuth();
  return (
    <>
    <DisplayTitle text= {'My statistics'} />
    </>
  )
}

export default MyStatistics;