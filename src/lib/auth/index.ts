import axios, { AxiosRequestConfig } from "axios";
import { AES, enc } from "crypto-js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import isOnline from "is-online";
interface LoginPayload {
  // Define the properties of your payload here
}
// Define the type for your API response
interface APIResponse {
  data: any;
  accessToken: string;
  // Define the properties of your API response here
}
// Define your headers
const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
  "secrete-api-key": `${process.env.DATE}`, // You might need to specify the type of process.env.DATE
};

const saltKey = process.env.DATE;
// encrypt with Crypto-js
const encrypt = (value: string) => AES.encrypt(value, `${saltKey}`).toString();
// decrypt token

const decryptToken = (encryptedToken: string): string => {
  return AES.decrypt(encryptedToken, `${saltKey}`).toString(enc.Utf8);
};

const clearAccessToken = () => {
  const secreteName = `${process.env.ACCESS_COOKIE}`;
  Cookies.remove(secreteName);
  delete axios.defaults.headers.common["Authorization"];
};

export const renewAccessToken = async () => {
  try {
    const payload = { email: "" };
    const response = await axios.post(
      "https://api.careerawesome.com/api/user/refresh-token",
      payload,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const { accessToken } = response.data;
      // console.log(accessToken);
      const secreteName = `${process.env.ACCESS_COOKIE}`;
      const accessTokenStr = `Bearer ${accessToken}`;
      Cookies.set(secreteName, encrypt(accessTokenStr), {
        expires: 7,
        secure: true,
      });
      axios.defaults.headers.common["Authorization"] = accessTokenStr;
      return accessToken;
    }
  } catch (error) {
    console.error("Error renewing access token:", error);
    // clearAccessToken();
    // we delete the access token if there is any error and logout the user and push to login page
    return undefined;
  }
};

export const getValidAuthToken = async () => {
  const session = Cookies.get(`${process.env.ACCESS_COOKIE}`);
  if (!session) {
    return undefined;
  } else {
    // if the cookies is found decrypt it
    const token = decryptToken(session);
    if (token) {
      // console.log(token)
      // if it is successful check if it is valid in the server
      const isTokenValid = await verifyToken(token);
      console.log("is token valid:", isTokenValid);
      const decodedToken: any = jwtDecode(token);
      // console.log("decoded token:", decodedToken)
      const email = decodedToken.email;
      // check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        // refresh the token look for the refresh token
        const token = await renewAccessToken();
        return token;
      } else {
        // is the token valid in the server anymore
        if (isTokenValid) {
          // if the token is valid then set authorization headers and return the token
          axios.defaults.headers.common["Authorization"] = token;
          return token;
        } else {
          // refresh token if there is an access token available
          const token = await renewAccessToken();
          return token;
        }
      }
    }
  }
};

const verifyToken = async (token: string) => {
  try {
    const response = await axios.post(
      "https://api.careerawesome.com/api/user/verifyTok",
      { tok: token }
    );
    if (response.data.isTokValid) {
      // Token is valid
      return true;
    } else {
      // Token is not valid
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const LogOutFunction = async () => {
  const userOnline = await isOnline();
  if (userOnline) {
    const secreteName = `${process.env.ACCESS_COOKIE}`;
    Cookies.remove(secreteName);
    delete axios.defaults.headers.common["Authorization"];
  }
};
