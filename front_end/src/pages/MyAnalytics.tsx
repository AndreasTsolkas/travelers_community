import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function MyAnalytics() {

  hasAccessAuth();
  return (
    <>
    <DisplayTitle text= {'My analytics'} />
    </>
  )
}

export default MyAnalytics;