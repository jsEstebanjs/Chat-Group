import styles from './chat.module.scss';
import { MdSend } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Chat({ channelId, socket }) {
    const [valueMessage, setValueMessage] = useState("")
    const user = useSelector((state) => state.userSlice.name)
    const handleMessage = async (e) => {
        e.preventDefault()
        if (valueMessage !== "") {
            const messageData = {
                room: channelId,
                author: user,
                message: valueMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            //   setMessageList((list) => [...list, messageData]);
            setValueMessage("")
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            // setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.containerChat}>
                {/* mensages aqui */}
            </div>
            <form onSubmit={(e) => handleMessage(e)} className={styles.mainContainerInputChat}>
                <input onChange={(e) => setValueMessage(e.target.value)} value={valueMessage} type='text' placeholder='Type a message here' />
                <button type='submit'><MdSend /></button>
            </form>
        </div>
    )

}
export default Chat;