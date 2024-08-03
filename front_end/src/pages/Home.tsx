import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import * as Important from "src/important";
import {travelSitesLinks} from "src/links";
import { DisplayLoader, DisplayTitle } from "src/display";

function Home() {

  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const accessTokenCookie = Important.accessTokenCookie;
  
  const handleIframeLoad = () => {
    console.log("here");
    setIsIframeLoaded(true);
  }

  const displayIframe = (url: string) => {
    return (
      <>
        {!isIframeLoaded && <DisplayLoader />}
        <iframe
          src={url}
          title="Travelingguide"
          width="375px"
          height="400px"
          onLoad={handleIframeLoad}
          style={{ display: isIframeLoaded ? "block" : "none" }}
        />
      </>
    );
  };


  useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (!token) 
      navigate('/signin');
  }, [cookies, navigate, accessTokenCookie]);
    
  return (
    <>
      <DisplayTitle text="Welcome to our community! Share your travel experiences and contribute to our community's travel knowledge." />
  
      <div className="iframes-grid">
        {travelSitesLinks.map((url, index) => (
          <div key={index} className="iframe-grid-item">
            {displayIframe(url)}
          </div>
        ))}
      </div>
    </>
  );
}
  
export default Home;