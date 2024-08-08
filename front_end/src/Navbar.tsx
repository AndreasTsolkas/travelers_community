import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Important from "src/important";
import "src/basic.css";
import { useCookies } from "react-cookie";

function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const accessTokenCookie = Important.accessTokenCookie;
  const avatarImageUrlCookie = Important.avatarImageUrlCookie;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLoggedIn: boolean = true;
  const settings = ["My Profile", "My Analytics", "Sign Out"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    navigate("/myprofile");
    handleCloseUserMenu();
  };

  const handleMyAanalyticsClick = () => {
    navigate("/myanalytics");
    handleCloseUserMenu();
  };

  const logoutUser = async () => {
    try {
      if (isLoggedIn) {
        removeCookie(accessTokenCookie);
        removeCookie(avatarImageUrlCookie);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const avatarImageUrl = cookies[avatarImageUrlCookie];
    console.log(avatarImageUrl);
    setAvatarUrl(avatarImageUrl);
  }, [cookies, avatarImageUrlCookie]);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div style={{ marginLeft: "-820px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar src={avatarUrl} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "0px",
                transform: "translateX(70px)",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    if (setting === "Sign Out") {
                      logoutUser();
                    } else if (setting === "My Profile") {
                      handleProfileClick();
                    } else if (setting === "My Analytics") {
                      handleMyAanalyticsClick();
                    } else {
                      handleCloseUserMenu();
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mytravels">My travels</Link>
        </li>
        <li>
          <Link to="/suggestions">Suggestions</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/website">Website</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
