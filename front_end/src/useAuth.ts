import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import * as Important from 'src/important';
import * as Cookies from 'src/cookies';

const accessTokenCookie = Important.accessTokenCookie;

export const hasAccessAuth = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const redirectTo = Important.redirectWhenHasNoAccess;

  const checkAccess = () => {
    const token = cookies[accessTokenCookie];
    if (!token) {
      navigate(redirectTo);
    }
  };

  useEffect(() => {
    checkAccess();
  }, [redirectTo]);

  return checkAccess;
};

export const isAccessTokenNotExpired = () => {
  const navigate = useNavigate();
  const redirectTo = Important.redirectWhenHasNoAccess;
  
  if(!Cookies.cookiesValidation())
    navigate(redirectTo);

};