import NavUserAndChannels from "../NavUserAndChannels";
import Logo from './chat-icon.png'
import styles from './index.module.scss';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
function ContainerChat() {
    const [modalChannels, setModalChannels] = useState(false)
    const handleModalChannels = () => {
        setModalChannels(!modalChannels)
    }
    return (
        <div className={styles.mainContainerChatContainer}>
            <NavUserAndChannels img={true} visible={modalChannels} funHandle={handleModalChannels} />
            <div className={styles.containerChatContainer}>
                <div className={styles.containerNavChatContainer}>
                    <span onClick={() => handleModalChannels()}><MdKeyboardArrowLeft /></span>
                    <h2 onClick={() => handleModalChannels()}>Channels</h2>
                </div>
                <img src={Logo} alt='logo' />
                <h2>Chat Group</h2>
                <p>Join Any Channel to Start Texting</p>
            </div>
            {/* navSettings */}

        </div>
    )
}
export default ContainerChat;