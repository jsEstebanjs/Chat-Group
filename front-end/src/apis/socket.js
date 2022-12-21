import io from 'socket.io-client'

const socket = io.connect(`${process.env.REACT_APP_URL_BACK}`)

export default socket;