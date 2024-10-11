import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import * as Important from "src/important";
import { travelSitesLinks } from "src/links";
import { DisplayLoader, DisplayTitle } from "src/display";
import { Box } from "@mui/material";
import 'src/css/pages.css';

function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const accessTokenCookie = Important.accessTokenCookie;

  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };

  const displayIframe = (url: string) => {
    return (
      <Box sx={{ position: 'relative', width: '375px', height: '400px' }}>
        {!isIframeLoaded && <DisplayLoader />}
        <iframe
          src={url}
          title="Travelingguide"
          width="100%" 
          height="100%" 
          onLoad={handleIframeLoad}
          style={{ display: isIframeLoaded ? "block" : "none", position: 'absolute' }}
        />
      </Box>
    );
  };

  useEffect(() => {
    const token = cookies[accessTokenCookie];
    if (!token) navigate("/signin");
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
