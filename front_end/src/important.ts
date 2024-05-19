export const appLogoImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHqFLMP_n6u8RhHsT-ERKE4xXGiKs6VdqCw&s';
export const backEndBaseUrl = 'http://localhost:3001';
export const accessTokenCookie = 'access_token';
export const adminCookie = 'admin';

export const authUrl =  '/auth';
export const userUrl =  '/user';
export const bookUrl = '/book';
export const hasReadUrl = '/hasread';
export const profileUrl = '/profile';

export const passwordUrl = '/password';

export const backEndAuthUrl = backEndBaseUrl + authUrl;
export const backEndUserUrl = backEndBaseUrl + userUrl;
export const backEndBookUrl = backEndBaseUrl + bookUrl;
export const backEndHasReadUrl = backEndBaseUrl + hasReadUrl;
export const backEndProfileUrl = backEndBaseUrl + profileUrl;

export const standartGetAllExtension = '/all';
export const getAllUser = userUrl + standartGetAllExtension;
export const getAllBooks = bookUrl + standartGetAllExtension;
export const getAllHasReadUrl = hasReadUrl + standartGetAllExtension;

export const redirectWhenHasNoAccess = '/signin';
export const moreInformationLinkBase = 'ReadView/';