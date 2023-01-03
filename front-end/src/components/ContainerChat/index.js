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
import { setInitialStateGroup } from "../../store/groupSlice";
import { editGroupUser } from "../../store/userSlice";

function ContainerChat() {
    const [modalChannels, setModalChannels] = useState(false)
    const [modalInfoChannel, setModalInfoChannel] = useState(false)
    const [loaderMessagesAndGroup, setLoaderMessagesAndGroup] = useState(false)
    const [messages, setMessages] = useState([])
    const group = useSelector((state) => state.groupSlice)
    const dispatch = useDispatch()

    const handleModalChannels = (value) => {
        setModalChannels(value)
    }
    const handleModalInfoChannel = (value) => {
        setModalInfoChannel(value)
    }
    useEffect(() => {
        const getGroup = async () => {
            const res = await GetGroup(group._id);
            if (res?.data?.group?.name) {
                const { usersId, ownersId, name, messages, description } = res.data.group
                dispatch(setInitialStateGroup({ usersId, ownersId, name, messages, description }))
                const resMessage = await GetMessages(15, 1, group._id)
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
        socket.on("emit_update_group", (data) => {
            dispatch(editGroupUser({ _id: data._id, name: data.name }))
            dispatch(setInitialStateGroup({
                usersId: data.usersId,
                ownersId: data.ownersId,
                name: data.name,
                messages: data.messages,
                description: data.description,
            }))
        })
        return () => {
            socket.off("emit_update_group")
        }
    }, [socket])

    const addNewMessage = (newMessage) => {
        setMessages((oldMessage) => [newMessage, ...oldMessage])
    }


    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels visible={modalChannels} funHandle={handleModalChannels} />
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
                        <img src={Logo} alt='logo' />
                        <h2>Chat Group</h2>
                        <p>Join Any Channel to Start Texting</p>
                    </div>
                    :
                    loaderMessagesAndGroup
                        ?
                        <LoaderMessageAndInfoGroup />
                        :
                        <Chat addNewMessage={addNewMessage} messages={messages} />
                }
                <NavInfoChannel visible={modalInfoChannel} funHandle={handleModalInfoChannel} />
            </div>
        </div>
    )
}
export default ContainerChat;