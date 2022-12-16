import NavUserAndChannels from "../NavUserAndChannels";
import styles from './index.module.scss';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import Logo from '../../images/chat-icon.png'
import Chat from "./Chat";
import { MdMoreVert } from "react-icons/md";
import NavInfoChannel from "../NavInfoChannel";
import { useSelector } from "react-redux";

function ContainerChat({socket}) {
    const [modalChannels, setModalChannels] = useState(false)
    const [modalInfoChannel, setModalInfoChannel] = useState(false)
    const channelId = useSelector((state) => state.channelIdSlice.id)

    const handleModalChannels = (value) => {
        setModalChannels(value)
    }
    const handleModalInfoChannel = (value) => {
        setModalInfoChannel(value)
    }
    useEffect(()=>{
        if(channelId){

        }

    },[channelId])
    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels visible={modalChannels} funHandle={handleModalChannels} />
            <div className={styles.containerChatContainer}>
                <div className={styles.containerNavChatContainer}>
                    <div className={styles.containerArrowAndTitle}>
                        <span onClick={() => handleModalChannels(true)}><MdKeyboardArrowLeft /></span>
                        <h2>Channels</h2>
                    </div>
                    <span onClick={() => handleModalInfoChannel(true)}><MdMoreVert /></span>
                </div>
                {!channelId
                    ?
                    <div className={styles.containerDefaultChat}>
                        <img src={Logo} alt='logo' />
                        <h2>Chat Group</h2>
                        <p>Join Any Channel to Start Texting</p>
                    </div>
                    :
                    <Chat socket={socket} channelId={channelId} />
                }
                <NavInfoChannel visible={modalInfoChannel} funHandle={handleModalInfoChannel} />
            </div>
        </div>
    )
}
export default ContainerChat;