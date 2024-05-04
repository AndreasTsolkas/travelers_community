import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { hasAccessAuth } from "src/useAuth";

import * as Important from "src/important";
import { DisplayTableTitle } from "src/display";

function Home() {

  const navigate = useNavigate();
  const [cookies] = useCookies();
  const accessTokenCookie = Important.accessTokenCookie;
  
  useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (!token) 
      navigate('/signin');
  }, [cookies, navigate, accessTokenCookie]);
    
    return (
      <div>
      <DisplayTableTitle text= {'Home'} />
      </div>
    )
}
  
export default Home;