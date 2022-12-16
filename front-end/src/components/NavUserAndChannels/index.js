import styles from './index.module.scss'
import { MdAdd, MdKeyboardArrowDown, MdAccountCircle, MdLogout, MdClose, MdSearch } from "react-icons/md";
import { useState } from 'react';
import CreateChannel from '../CreateChannel';
import ModalChannel from '../ModalChannel';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function NavUserAndChannels({ funHandle, visible }) {
    const [modalSettingsUser, setModalSettingsUser] = useState(false)
    const [modalNewChannel, setModalNewChannel] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.userSlice)

    const handleNewChannel = (value) => {
        setModalNewChannel(value)
    }
    const logOut = () => {
        Cookies.remove("token")
        dispatch(resetState())
        navigate("/login")

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
                    <div className={styles.mainContainerSearch}>
                        <div className={styles.containerSearch}>
                            <MdSearch />
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                    <div className={styles.mainContainerChannelsAndSearch}>
                        {user.groupsId.map((item) => (
                            <ModalChannel key={item._id} id={item._id} name={item.name} />
                        ))}
                    </div>
                    <div className={styles.containerUserInfo}>
                        {
                            user.picture
                                ?
                                <img src={`${user.picture}`} alt='user' />
                                :
                                <div className={styles.imgUserDefault}>
                                    {
                                        user.name.split(" ").length === 1
                                            ?
                                            `${user.name.split(" ")[0][0]?.toUpperCase()}`
                                            :
                                            user.name.split(" ").length > 1
                                                ?
                                                `${user.name.split(" ")[0][0].toUpperCase()}${user.name.split(" ")[1][0].toUpperCase()}`
                                                :
                                                null

                                    }
                                </div>

                        }

                        <div className={styles.containerUserInfoNameAndArrow}>
                            <h3>{user.name}</h3>
                            <button className={`${modalSettingsUser ? styles.buttonRotate : null}`} onClick={() => setModalSettingsUser(!modalSettingsUser)}><MdKeyboardArrowDown /></button>
                        </div>
                    </div>
                    <div className={`${styles.mainContainerSettingsUser} ${modalSettingsUser ? styles.mainContainerSettingsUserVisibility : null}`}>
                        <div className={styles.containerSettingsUser}>
                            <span><MdAccountCircle /></span>
                            <p>My Profile</p>
                        </div>
                        <span className={styles.borderSettingsUser}></span>
                        <div onClick={logOut} className={styles.containerLogOut}>
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