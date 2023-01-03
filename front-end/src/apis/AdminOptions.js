import axios from 'axios';
import Cookies from 'js-cookie'

export async function AdminOptions(id,data) {
    try {
        const res = await axios.put(`${process.env.REACT_APP_URL_BACK}/groups/adminOptions/${id}`, data, 
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        return res
    } catch (err) {
        return err
    }
}