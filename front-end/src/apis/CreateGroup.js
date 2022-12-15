import axios from 'axios';
import Cookies from 'js-cookie'

export async function CreateGroup(data) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACK}/groups`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        return res
    } catch (err) {
        return err
    }
}