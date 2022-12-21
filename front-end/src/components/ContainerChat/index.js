import NavUserAndChannels from "../NavUserAndChannels";
import styles from './index.module.scss';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import Logo from '../../images/chat-icon.png'
import Chat from "./Chat";
import { MdMoreVert } from "react-icons/md";
import NavInfoChannel from "../NavInfoChannel";
import { useSelector } from "react-redux";
import { GetGroup } from "../../apis/GetGroup";
import LoaderMessageAndInfoGroup from "./LoaderMessageAndInfoGroup";
import socket from "../../apis/socket";

function ContainerChat() {
    const [modalChannels, setModalChannels] = useState(false)
    const [modalInfoChannel, setModalInfoChannel] = useState(false)
    const [groupInfo, setGroupInfo] = useState({})
    const [loaderMessagesAndGroup, setLoaderMessagesAndGroup] = useState(false)
    const channelId = useSelector((state) => state.channelIdSlice.id)

    const handleModalChannels = (value) => {
        setModalChannels(value)
    }
    const handleModalInfoChannel = (value) => {
        setModalInfoChannel(value)
    }
    useEffect(() => {
        const getGroup = async () => {
            const res = await GetGroup(channelId);
            if (res?.data?.group?.name) {
                setGroupInfo(res.data.group)
                setLoaderMessagesAndGroup(false)
            }
        }

        if (channelId) {
            setLoaderMessagesAndGroup(true)
            getGroup()
        }

    }, [channelId])

    useEffect(() => {
        socket.on("add_user_group", (data) => {
            setGroupInfo((groupInfo)=>({
                ...groupInfo,
                usersId:data

            }))
        })
        return()=>{
            socket.off("add_user_group")
        }
    }, [socket])

    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels visible={modalChannels} funHandle={handleModalChannels} />
            <div className={styles.containerChatContainer}>
                {
                    !loaderMessagesAndGroup ?
                        <div className={`${groupInfo.name ? styles.containerNavChatContainer : styles.containerNavChatContainerDefault}`}>
                            <div className={styles.containerArrowAndTitle}>
                                <span onClick={() => handleModalChannels(true)}><MdKeyboardArrowLeft /></span>
                                <h2>{groupInfo.name ? groupInfo.name.trim() : "Channels"}</h2>
                            </div>
                            {groupInfo.name ?
                                <span onClick={() => handleModalInfoChannel(true)}><MdMoreVert /></span>
                                :
                                null
                            }
                        </div>
                        :
                        null
                }

                {!channelId
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
                        <Chat channelId={channelId} />
                }
                <NavInfoChannel groupInfo={groupInfo} visible={modalInfoChannel} funHandle={handleModalInfoChannel} />
            </div>
        </div>
    )
}
export default ContainerChat;