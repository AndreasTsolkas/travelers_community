import { DisplayTableTitle, DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  hasAccessAuth();

  return (
    <>
      <DisplayTitle text={"Suggestions"} />
    </>
  );
}

export default Suggestions;
