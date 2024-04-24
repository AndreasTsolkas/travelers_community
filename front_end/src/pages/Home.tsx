import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { hasAccessAuth } from "src/useAuth";

import * as Important from "src/important";

function Home() {

  const navigate = useNavigate();
  const [cookies] = useCookies();
  const accessTokenCookie = Important.accessTokenCookie;
  
  useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (!token) 
      navigate('/signIn');
  }, [cookies, navigate, accessTokenCookie]);
    
    return (
      <div>
      <h2>Home</h2>
      </div>
    )
}
  
export default Home;