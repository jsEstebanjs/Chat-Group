import axios from 'axios';
import Cookies from 'js-cookie'

export async function GetGroup(id) {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_BACK}/groups/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
        })
        return res
    } catch (err) {
        return err
    }
}