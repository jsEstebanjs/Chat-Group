import axios from 'axios';
import Cookies from 'js-cookie'

export async function DeleteGroup(id) {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_URL_BACK}/groups/${id}`,
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