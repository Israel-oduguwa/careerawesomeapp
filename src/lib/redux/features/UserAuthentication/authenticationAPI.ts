import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AES, enc } from "crypto-js";
import Cookies from "js-cookie";

// Define the type for your payload
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

// Define your loginUser function
export const loginAPI = async (
  payload: LoginPayload
): Promise<APIResponse> => {
  try {
    const response: AxiosResponse<APIResponse> = await axios.post(
      "https://api.careerawesome.com/api/users/login",
      payload,
      {
        withCredentials: true, // Important for sending cookies in cross-origin requests
        headers,
      }
    );
    await setAuthorizationHeader(response.data.accessToken);
    // we get the user Data from database 
    const userData = await getUserDataAPI();
    // send the userData as payload 
    return userData
  } catch (error) {
    // Handle errors here
    console.error("Error occurred while logging in:", error);
    throw error;
  }
};

export const getUserDataAPI = async () => {
  try {
    const response = await axios.get(
      "https://api.careerawesome.com/api/users/user",
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


// export async function updateAccessToken() {
//   try {
//     const payload = { email: "" };
//     const response = await axios.post(
//       "https://api.careerawesome.com/api/user/refresh-token",
//       payload,
//       {
//         withCredentials: true,
//       }
//     );
//     if (response.status === 200) {
//       const { accessToken } = response.data;
//       console.log(accessToken);
//       const secreteName = `${process.env.ACCESS_COOKIE}`;
//       const accessTokenStr = `Bearer ${accessToken}`;
//       const encryptedToken = encrypt(accessToken);
//       Cookies.set(secreteName, encrypt(encryptedToken), {
//         expires: 7,
//         secure: true,
//       });
//       axios.defaults.headers.common["Authorization"] = accessTokenStr;
//       // return accessToken;
//     }
//   } catch (error) {
//     console.error("Error renewing access token:", error);
//   }
// }

const setAuthorizationHeader = async (token: string): Promise<void> => {
  const accessToken = `Bearer ${token}`;
  // Assuming encrypt is a function that returns a string
  const encryptedToken = encrypt(accessToken);
  const secreteName = `${process.env.ACCESS_COOKIE}`;
  Cookies.set(secreteName, encryptedToken, {
    expires: 7,
    secure: true,
  });
  axios.defaults.headers.common["Authorization"] = accessToken;
};
