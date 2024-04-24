import { hasAccessAuth } from "src/useAuth";

function Statistics() {

    hasAccessAuth();
    
    return (
      <div>
      <h2>Statistics</h2>
      </div>
    )
  }
  
  export default Statistics;