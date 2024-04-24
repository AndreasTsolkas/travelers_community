import { hasAccessAuth } from "src/useAuth";

function ThisRead() {

    hasAccessAuth();
    
    return (
      <div>
      <h2>ThisRead</h2>
      </div>
    )
  }
  
  export default ThisRead;