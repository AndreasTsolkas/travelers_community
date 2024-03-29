import axios from 'axios';
import * as Important from "./important";

const backEndBaseUrl = Important.backEndBaseUrl;

const axiosConfig = {
        url:'',
        headers: {
            'Authorization': '', 
            'role': '',
        },
        params: {}, 
        initialized: false
};
    
async function getRequest(requestUrl, params = {}) {
        try {
            const config = {
                baseURL: axiosConfig.url,
                headers: axiosConfig.headers,
                params: params
            };
    
            const response = await axios.get(requestUrl, config);
            return response;
        } catch (error) {
            throw error;
        }
    }

async function deleteRequest(requestUrl) {
        try {
                const response = await axios.delete(requestUrl, {
                        baseURL: axiosConfig.url,
                        headers: axiosConfig.headers
                });
                return response;
        } catch (error) {
                throw error;
        }
}

async function postRequest(requestUrl, data){
        try{
                const response = await axios.post(`${requestUrl}`, data, {
                        baseURL: axiosConfig.url,
                        headers: axiosConfig.headers
                });
                return response;
        } catch(error){
                throw error;
        }
}

async function patchRequest(requestUrl, data){
        try{
                const response = await axios.patch(`${requestUrl}`, data, {
                        baseURL: axiosConfig.url,
                        headers: axiosConfig.headers
                })
                return response;
        }catch(error){
                throw error;
        }
}

async function putRequest(requestUrl, data){
        try{
                const response = await axios.put(`${requestUrl}`, data, {
                        baseURL: axiosConfig.url,
                        headers: axiosConfig.headers
                })
                return response;
        }catch(error){
                throw error;
        }
}

/*function getCookies  ()  {
        const cookies = new Cookies();
        const token = cookies.get(accessTokenCookie);
        const isAdmin = cookies.get(adminCookie);
        return {token, isAdmin};
}*/

export const initializeAxiosConfig = () => {
        /*const { token, isAdmin } = getCookies();*/
        axiosConfig.url = backEndBaseUrl ? `${backEndBaseUrl}` : '';
        /*axiosConfig.headers.Authorization = token ? `Bearer ${token}` : '';
        axiosConfig.headers.role = isAdmin ? 'admin' : 'user';*/
        axiosConfig.initialized = true;
};

const authGetRequest = async (requestUrl, params = {}) => {
        if(axiosConfig.initialized === false) {}
          initializeAxiosConfig();
        return getRequest(requestUrl, params);
}
const authDeleteRequest = async (requestUrl) => {
        if(axiosConfig.initialized === false) 
          initializeAxiosConfig();
        return deleteRequest(requestUrl);
}

const authPostRequest = async (requestUrl, data) => {
        if(axiosConfig.initialized === false) 
          initializeAxiosConfig();
        return postRequest(requestUrl, data);
}

const authPatchRequest = async (requestUrl, data) => {
        if(axiosConfig.initialized === false) 
          initializeAxiosConfig();
        return patchRequest(requestUrl, data);
}

const authPutRequest = async (requestUrl, data) => {
        if(axiosConfig.initialized === false) 
          initializeAxiosConfig();
        return putRequest(requestUrl, data);
}



export const httpClient = {
        
        get: authGetRequest,
        post: authPostRequest,
        patch: authPatchRequest,
        put: authPutRequest, 
        delete: authDeleteRequest,
        
}