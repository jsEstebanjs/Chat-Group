import axios from 'axios';
import Cookies from 'js-cookie'

export async function AcceptInvitation(id) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACK}/invitation/${id}`,{},{
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
        return res
    } catch (err) {
        return err
    }
}
