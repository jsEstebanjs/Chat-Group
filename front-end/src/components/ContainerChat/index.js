import NavUserAndChannels from "../NavUserAndChannels";
import styles from './index.module.scss';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import Logo from '../../images/chat-icon.png'
import Chat from "./Chat";
import { MdMoreVert } from "react-icons/md";
import NavInfoChannel from "../NavInfoChannel";
import { useDispatch, useSelector } from "react-redux";
import { GetGroup } from "../../apis/GetGroup";
import LoaderMessageAndInfoGroup from "./LoaderMessageAndInfoGroup";
import socket from "../../apis/socket";
import { GetMessages } from '../../apis/GetMessages'
import { setInitialStateGroup, resetToInitialStateGroup } from "../../store/groupSlice";
import { editGroupUser, setInitialState } from "../../store/userSlice";
import { validateToken } from "../../apis/ValidateToken";

function ContainerChat() {
    const [modalChannels, setModalChannels] = useState(false)
    const [modalInfoChannel, setModalInfoChannel] = useState(false)
    const [loaderMessagesAndGroup, setLoaderMessagesAndGroup] = useState(false)
    const [messages, setMessages] = useState([])
    const [infoMessage, setInfoMessage] = useState({ page: 0, amount: 15 })
    const group = useSelector((state) => state.groupSlice)
    const dispatch = useDispatch()

    const handleModalChannels = (value) => {
        setModalChannels(value)
    }
    const handleModalInfoChannel = (value) => {
        setModalInfoChannel(value)
    }
    const modifySetInfoMessage = () => {
        if (infoMessage.page !== null) {
            if (infoMessage.amount === 0) {
                setInfoMessage({ page: infoMessage.page + 1, amount: 14 })
            } else if (infoMessage.amount > 0) {
                setInfoMessage({ page: infoMessage.page, amount: infoMessage.amount - 1 })
            } 
        }

    }
    const resetNewInfoMessage = (page, amount) => {
            setInfoMessage({page,amount})
    }
    useEffect(() => {
        const getGroup = async () => {
            const res = await GetGroup(group._id);
            if (res?.data?.group?.name) {
                dispatch(setInitialStateGroup(res.data.group))
                const resMessage = await GetMessages(15, 1, group._id)
                setInfoMessage({ page: resMessage.data.message.nextPage, amount: 15 })
                setMessages(resMessage.data.message.docs)
                setLoaderMessagesAndGroup(false)
            }
        }

        if (group._id) {
            setLoaderMessagesAndGroup(true)
            getGroup()
        }

    }, [group._id])

    useEffect(() => {
        socket.on("emit_delete_group", async (data) => {
            await socket.emit("leave_room", data);
            const res = await validateToken()
            dispatch(setInitialState(res.data.data));
            if (data === group._id) {
                dispatch(resetToInitialStateGroup())
                handleModalInfoChannel(false)
            }
        })
        return () => {
            socket.off("emit_delete_group")
        }
    }, [socket, group])

    useEffect(() => {
        socket.on("emit_update_group", async (data) => {
            if (group._id === data._id) {
                const res = await validateToken()
                dispatch(setInitialState(res.data.data));
                dispatch(setInitialStateGroup({
                    usersId: data.usersId,
                    ownersId: data.ownersId,
                    name: data.name,
                    messages: data.messages,
                    description: data.description,
                    favicon:data.favicon
                }))
            }
            dispatch(editGroupUser({ _id: data._id, name: data.name, favicon:data.favicon }))
        })
        return () => {
            socket.off("emit_update_group")
        }
    }, [socket, group]);

    const addNewMessage = (newMessage) => {
        setMessages((oldMessage) => [newMessage, ...oldMessage])
    }
    const searchLastMessages = (newMessages) => {
        setMessages((oldMessages) => [...oldMessages, ...newMessages])
    }
    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels funHandleInfoGroup={handleModalInfoChannel} visible={modalChannels} funHandle={handleModalChannels} />
            <div className={styles.containerChatContainer}>
                {
                    !loaderMessagesAndGroup ?
                        <div className={`${group.name ? styles.containerNavChatContainer : styles.containerNavChatContainerDefault}`}>
                            <div className={styles.containerArrowAndTitle}>
                                <span onClick={() => handleModalChannels(true)}><MdKeyboardArrowLeft /></span>
                                <h2>{group.name ? group.name.trim() : "Channels"}</h2>
                            </div>
                            {group.name ?
                                <span onClick={() => handleModalInfoChannel(true)}><MdMoreVert /></span>
                                :
                                null
                            }
                        </div>
                        :
                        null
                }

                {!group._id
                    ?
                    <div className={styles.containerDefaultChat}>
                        <img className={styles.imgChatGroupDefault} src={Logo} alt='logo' />
                        <h2>Chat Group</h2>
                        <p>Join Any Channel to Start Texting</p>
                    </div>
                    :
                    loaderMessagesAndGroup
                        ?
                        <LoaderMessageAndInfoGroup />
                        :
                        <Chat resetNewInfoMessage={resetNewInfoMessage} searchLastMessages={searchLastMessages} modifySetInfoMessage={modifySetInfoMessage} infoMessage={infoMessage} addNewMessage={addNewMessage} messages={messages} />
                }
                <NavInfoChannel visible={modalInfoChannel} funHandle={handleModalInfoChannel} />
            </div>
        </div>
    )
}
export default ContainerChat;