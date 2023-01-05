import io from 'socket.io-client'

const socket = io.connect(`${process.env.REACT_APP_URL_BACK_SOCKET}`,{
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
})

export default socket;