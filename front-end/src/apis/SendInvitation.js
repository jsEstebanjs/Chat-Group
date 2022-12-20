import axios from "axios";
import Cookies from "js-cookie";


export const SendInvitation = async (groupId, emailUser) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACK}/invitation`, { groupId, emailUser }, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return res;
    } catch (err) {
        return err;
    }
};