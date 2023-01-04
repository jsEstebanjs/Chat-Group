import styles from './chat.module.scss';
import { MdSend } from "react-icons/md";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../apis/socket';
import { CreateMessage } from '../../apis/CreateMessage';
import { encryptData, decryptData } from '../../cryptoMessage';
import ModalMessage from '../ModalMessage';
import { Ring } from '@uiball/loaders'

function Chat({ messages, addNewMessage,infoMessage ,modifySetInfoMessage}) {
    const [valueMessage, setValueMessage] = useState("")
    const [loaderMessage, setLoaderMessage] = useState(false)
    const groupId = useSelector((state) => state.groupSlice._id)
    

    const handleMessage = async (e) => {
        e.preventDefault()
        if (valueMessage.trim() !== "") {
                setLoaderMessage(true)
                setValueMessage("")
                const res = await CreateMessage({ groupId: groupId, message: encryptData(valueMessage) })
                await socket.emit("send_message", res.data.data);
                modifySetInfoMessage()
                addNewMessage(res.data.data)
                setLoaderMessage(false)
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.groupId === groupId) {
                addNewMessage(data);
                modifySetInfoMessage()
            }
        })
        return () => {
            socket.off("receive_message")
        }
    }, [socket]);

    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.containerChat}>
                {messages.map((item) => (
                    <ModalMessage key={item._id} name={item.userId.name} date={item.createdAt} message={decryptData(item.message)} />
                ))}
            </div>
            <form onSubmit={(e) => handleMessage(e)} className={styles.mainContainerInputChat}>
                <input onChange={(e) => setValueMessage(e.target.value)} value={valueMessage} type='text' placeholder='Type a message here' />
                <button type='submit'>
                    {
                        loaderMessage
                            ?
                            <Ring size={20} color="#120F13" />
                            :
                            <MdSend />
                    }
                </button>
            </form>
        </div>
    )

}
export default Chat;