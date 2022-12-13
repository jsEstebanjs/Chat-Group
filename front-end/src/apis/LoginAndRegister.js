import axios from 'axios';

export async function LoginAndRegister(url, data) {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL_BACK}/users${url}`, {
            ...data
        })
        return res
    } catch (err) {
        return err
    }
}