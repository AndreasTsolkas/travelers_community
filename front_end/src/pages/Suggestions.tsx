import { hasAccessAuth } from "src/useAuth";

function Suggestions() {

  hasAccessAuth(); 
  
  return (
    <div>
    <h2>Suggestions</h2>
    </div>
  )
}

export default Suggestions;
