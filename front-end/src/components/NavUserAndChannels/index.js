import styles from './index.module.scss'
import { MdAdd, MdKeyboardArrowDown, MdAccountCircle, MdLogout, MdClose, MdSearch } from "react-icons/md";
import { useState } from 'react';
import CreateChannel from '../CreateChannel';
import ModalChannel from '../ModalChannel';

function NavUserAndChannels({ img, funHandle, visible }) {
    const [modalSettingsUser, setModalSettingsUser] = useState(false)
    const [modalNewChannel, setModalNewChannel] = useState(false)

    const handleNewChannel = (value) => {
        setModalNewChannel(value)
    }
    return (
        <>
            <div onClick={() => funHandle(false)} className={`${styles.opacity} ${visible ? styles.opacityVisible : null}`}></div>
            <CreateChannel visible={modalNewChannel} handle={handleNewChannel} />
            <div className={`${styles.mainContainerNavUserAndChannels} ${visible ? styles.mainContainerNavUserAndChannelsVisible : null}`}>
                <div className={styles.containerChannelsTitle}>
                    <h2>Channels</h2>
                    <button onClick={() => handleNewChannel(true)} type='button'><MdAdd /></button>
                </div>
                <div className={styles.mainContainerSearchAndUser}>
                    <div className={styles.mainContainerChannelsAndSearch}>
                        <div className={styles.containerSearch}>
                            <MdSearch />
                            <input type='text' placeholder='Search' />
                        </div>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                        <ModalChannel/>
                    </div>
                    <div className={styles.containerUserInfo}>
                        {
                            img
                                ?
                                <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user' />
                                :
                                <div className={styles.imgUserDefault}>
                                    M
                                </div>

                        }

                        <div className={styles.containerUserInfoNameAndArrow}>
                            <h3>Manuel</h3>
                            <button className={`${modalSettingsUser ? styles.buttonRotate : null}`} onClick={() => setModalSettingsUser(!modalSettingsUser)}><MdKeyboardArrowDown /></button>
                        </div>
                    </div>
                    <div className={`${styles.mainContainerSettingsUser} ${modalSettingsUser ? styles.mainContainerSettingsUserVisibility : null}`}>
                        <div className={styles.containerSettingsUser}>
                            <span><MdAccountCircle /></span>
                            <p>My Profile</p>
                        </div>
                        <span className={styles.borderSettingsUser}></span>
                        <div className={styles.containerLogOut}>
                            <span><MdLogout /></span>
                            <p>Logout</p>
                        </div>

                    </div>
                </div>
                <div onClick={() => funHandle(false)} className={`${styles.containerClose}`}>
                    <MdClose />
                </div>

            </div>
        </>

    )
}
export default NavUserAndChannels;