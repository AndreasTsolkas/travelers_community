import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Important from 'src/important';
import 'src/basic.css';

function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLoggedIn: boolean = true;
  const settings = ['My Profile', 'Sign Out'];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
     setAnchorElUser(null);
  };

  const handleProfileClick = () => {
     navigate('/profile'); 
     handleCloseUserMenu();
  }

  const logoutUser = async () => {
    try {
      if (isLoggedIn) {
        /*removeCookie(accessTokenCookie);
        removeCookie(adminCookie);*/
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/signIn');
      }
      } catch (error) {
         console.log(error);
         return [];
      } 
  }
    return (
        <nav className="navbar">
        <ul>
          <li >
          <div style ={{marginLeft:'-1050px'}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}  >
              <Avatar 
                src={Important.appLogoImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: '0px',
                transform: 'translateX(70px)'
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={() => {
                  if (setting === 'Sign Out') {
                    logoutUser();
                  } else if (setting === 'My Profile') {
                    handleProfileClick();
                  } else {
                    handleCloseUserMenu();
                  }
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
          </Menu>
          </div>
          </li>
          <li>
            <Link to="/myreads">My reads</Link>
          </li>
          <li>
            <Link to="/suggestions">Suggestions</Link>
          </li>
        </ul>
        </nav>
    )
  }
  
  export default Navbar;