import { DisplayTitle } from "src/display";
import { hasAccessAuth } from "src/useAuth";

function MyAnalytics() {
  hasAccessAuth();
  return (
    <>
      <DisplayTitle text={"My Analytics"} />
    </>
  );
}

export default MyAnalytics;
