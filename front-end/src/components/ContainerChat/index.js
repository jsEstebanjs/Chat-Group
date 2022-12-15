import NavUserAndChannels from "../NavUserAndChannels";
import styles from './index.module.scss';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import Logo from '../../images/chat-icon.png'
import Chat from "./Chat";
function ContainerChat() {
    const [modalChannels, setModalChannels] = useState(false)
    const [idChannel, setIdChannel] = useState("o")

    const handleModalChannels = (value) => {
        setModalChannels(value)
    }
    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels img={true} visible={modalChannels} funHandle={handleModalChannels} />
            <div className={styles.containerChatContainer}>
                <div className={styles.containerNavChatContainer}>
                    <span onClick={() => handleModalChannels(true)}><MdKeyboardArrowLeft /></span>
                    <h2 onClick={() => handleModalChannels(true)}>Channels</h2>
                </div>
                {!idChannel
                    ?
                    <>
                        <img src={Logo} alt='logo' />
                        <h2>Chat Group</h2>
                        <p>Join Any Channel to Start Texting</p>
                    </>
                    :
                    <Chat/>
                }
            </div>
            {/* navSettings */}

        </div>
    )
}
export default ContainerChat;