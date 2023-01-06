import styles from './chat.module.scss';
import { MdSend, MdWifiTetheringErrorRounded } from "react-icons/md";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../apis/socket';
import { CreateMessage } from '../../apis/CreateMessage';
import { encryptData, decryptData } from '../../cryptoMessage';
import ModalMessage from '../ModalMessage';
import { Ring, DotWave } from '@uiball/loaders'
import { GetMessages } from '../../apis/GetMessages';

function Chat({ messages, addNewMessage, infoMessage, modifySetInfoMessage, searchLastMessages, resetNewInfoMessage }) {
    const [valueMessage, setValueMessage] = useState("")
    const [loaderMessage, setLoaderMessage] = useState(false)
    const [myElementIsVisible, setMyElementIsVisible] = useState()
    const [loaderOldMessages, setLoaderOldMessages] = useState(false)
    const [errorLoaderOldMessages, setErrorLoaderOldMessages] = useState(false)
    const groupId = useSelector((state) => state.groupSlice._id)


    const intObserver = useRef()
    const lastPostRef = useCallback(post => {
    if (intObserver.current) intObserver.current.disconnect()
        intObserver.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setMyElementIsVisible(entries[0].isIntersecting)
            }else{
                setMyElementIsVisible(false)
            }
     })
        if (post) intObserver.current.observe(post)
    }, [intObserver.current])


    useEffect(() => {
        if (myElementIsVisible && infoMessage.page !== null) {
            const page = infoMessage.amount === 0 ? infoMessage.page + 1 : infoMessage.page
            setLoaderOldMessages(true)
            GetMessages(15, page, groupId)
                .then((res) => {
                    const refactor = res.data.message.docs
                    refactor.reverse().splice(res.data.message.docs.length - (15 - infoMessage.amount), res.data.message.docs.length - infoMessage.amount)
                    searchLastMessages(refactor.reverse())
                    resetNewInfoMessage(res.data.message.nextPage, 15)
                })
                .catch((err) => {
                    setErrorLoaderOldMessages(true)
                    setTimeout(() => {
                        setErrorLoaderOldMessages(false)
                    }, 5000)
                })
            setLoaderOldMessages(false)
        }
    }, [myElementIsVisible])



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
            console.log("llego un mensaje",data)
            if (data.groupId === groupId) {
                console.log("se incluyo el mensaje",data)
                addNewMessage(data);
                modifySetInfoMessage();
            }
        })
        return () => {
            socket.off("receive_message")
        }
    }, [socket, infoMessage]);

    return (
        <div className={styles.mainContainerChat}>
            <div className={styles.containerChat}>
                {messages.map((item, index) => {
                    if (messages.length === index + 1) {
                        return <ModalMessage ref={lastPostRef} key={item._id} name={item.userId.name} date={item.createdAt} message={decryptData(item.message)} />
                    }
                    return <ModalMessage key={item._id} name={item.userId.name} date={item.createdAt} message={decryptData(item.message)} />


                })}
                {loaderOldMessages
                    ?
                    <div className={styles.containerLoaderOldMessages}>
                        <p className={styles.textLoaderOldMessages}>Loading old messages</p>
                        <DotWave size={35} color="#2F80ED" />
                    </div>
                    :
                    null}
                {errorLoaderOldMessages
                    ?
                    <div className={styles.containerLoaderOldMessages}>
                        <span className={styles.errorLoaderOldMessages}>Error loading old messages<MdWifiTetheringErrorRounded /></span>
                    </div>
                    :
                    null}
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