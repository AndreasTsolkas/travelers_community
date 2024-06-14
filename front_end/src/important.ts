export const appLogoImage = 'https://static.vecteezy.com/system/resources/previews/015/716/237/original/paper-plane-flying-around-the-globe-around-the-world-travelling-by-plane-airplane-trip-in-various-country-planet-earth-travel-and-tourism-concept-vector.jpg';
export const backEndBaseUrl = 'http://localhost:3001';
export const accessTokenCookie = 'access_token';
export const avatarImageUrlCookie = 'avatar_img_url';

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
export const moreInformationLinkBase = 'travelview/';
export let userProfileImage = undefined;