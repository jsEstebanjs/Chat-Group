import axios from "axios";
import Cookies from "js-cookie";


export const validateToken = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACK}/users`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return res;
  } catch (err) {
    return false;
  }
};