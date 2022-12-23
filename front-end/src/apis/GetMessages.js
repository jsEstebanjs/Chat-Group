import axios from 'axios';
import Cookies from 'js-cookie'

export async function GetMessages(limit,page,groupId) {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACK}/message?limit=${limit}&page=${page}&group=${groupId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        return res
    } catch (err) {
        return err
    }
}