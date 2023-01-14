import styles from './index.module.scss'
import { MdAdd, MdKeyboardArrowDown, MdAccountCircle, MdLogout, MdClose, MdSearch, MdGroupAdd } from "react-icons/md";
import { useState, useEffect } from 'react';
import CreateChannel from '../CreateChannel';
import ModalChannel from '../ModalChannel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import MyInvitations from '../MyInvitations';
import axios from 'axios';
import { Ring } from '@uiball/loaders'
import { useOutsideClick } from '../../hooks/useOutsideClick';
import socket from '../../apis/socket';
import { resetToInitialStateGroup,setInitialStateGroup } from '../../store/groupSlice';
import { validateToken } from '../../apis/ValidateToken';
import { setInitialState, resetState } from '../../store/userSlice';

function NavUserAndChannels({ funHandle, visible,funHandleInfoGroup }) {
    const [modalSettingsUser, setModalSettingsUser] = useState(false)
    const [modalNewChannel, setModalNewChannel] = useState(false)
    const [myInvitations, setMyInvitations] = useState(false)
    const [invitations, setInvitations] = useState([])
    const [loaderInvitations, setLoaderInvitations] = useState(true)
    const [fetch, setFetch] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.userSlice)
    const [groups,setGroups] = useState([])
    const groupId = useSelector((state)=> state.groupSlice._id)
    const ref = useOutsideClick(setModalSettingsUser)
    useEffect(() => {
        setLoaderInvitations(true)
        axios
            .get(`${process.env.REACT_APP_URL_BACK}/invitation`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            })
            .then((res) => {
                setInvitations(res.data.data)
            })
            .catch((err) => {
            })
            .finally(() => {
                setLoaderInvitations(false)
            });
    }, [fetch])
    useEffect(()=>{
        setGroups(user.groupsId)
    },[user.groupsId])
    
    useEffect(() => {
        socket.on("receive_update_user", async(data) => {
            if(data.action === "send_invitation"){
                pushInvitation(data.data)
            }else if(data.action === "removed_from_group"){
                const res = await validateToken()
                dispatch(setInitialState(res.data.data))
                if(groupId === data.data._id){
                    funHandleInfoGroup(false)
                    dispatch(resetToInitialStateGroup())
                }
            }else if("update_range_group"){
                const res = await validateToken()
                dispatch(setInitialState(res.data.data))
                if(groupId === data.data._id){
                    
                    dispatch(setInitialStateGroup(
                        {
                            usersId: data.data.usersId,
                            ownersId: data.data.ownersId,
                            name: data.data.name,
                            messages: data.data.messages,
                            description: data.data.description,
                        }
                    ))
                }
            }
        });
        return () => {
            socket.off("receive_update_user")
        }
    }, [socket,groupId]);

    const handleFetch = () => {
        setFetch(!fetch)
    }

    const handleNewChannel = (value) => {
        setModalNewChannel(value)
    }
    const logOut = () => {
        Cookies.remove("token")
        dispatch(resetState())
        dispatch(resetToInitialStateGroup())
        navigate("/login")

    }
    const handleMyInvitations = (value) => {
        setMyInvitations(value)
    }

    const pushInvitation = (data) => {
        setInvitations((list) => [...list, data])
    }

    const searchGroup = (e) =>{
        if(e.target.value.length === 0){
            setGroups(user.groupsId)
        }else if(e.target.value.length > 0){
            const filterGroups = groups.filter((item)=>{
                if(item.name.includes(e.target.value)){
                    return item
                }
            })
            setGroups(filterGroups)
        }
        
    }
    return (
        <>
            <div onClick={() => funHandle(false)} className={`${styles.opacity} ${visible ? styles.opacityVisible : null}`}></div>
            <MyInvitations  loaderInvitations={loaderInvitations} invitations={invitations} reload={handleFetch} handle={handleMyInvitations} visible={myInvitations} />
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
                            <input type='text' placeholder='Search' onChange={(e)=> searchGroup(e)}/>
                        </div>
                    </div>
                    <div className={styles.mainContainerChannelsAndSearch}>
                        {groups.map((item) => (
                            <ModalChannel funHandle={funHandle} key={item._id} id={item._id} name={item.name} favicon={item.favicon} />
                        ))}
                    </div>
                    <div  className={styles.containerUserInfo}>
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
                            <button ref={ref} className={`${modalSettingsUser ? styles.buttonRotate : null}`} onClick={() => setModalSettingsUser(!modalSettingsUser)}><MdKeyboardArrowDown /></button>
                        </div >
                    </div>
                    <div className={`${styles.mainContainerSettingsUser} ${modalSettingsUser ? styles.mainContainerSettingsUserVisibility : null}`}>
                        {/* <div onClick={() => setModalSettingsUser(!modalSettingsUser)} className={styles.containerSettingsUser}>
                            <span><MdAccountCircle /></span>
                            <p>My Profile</p>
                        </div> */}
                        <div onClick={() => {
                            handleMyInvitations(true)
                            setModalSettingsUser(!modalSettingsUser)
                        }} className={styles.containerSettingsUser}>
                            <span><MdGroupAdd /></span>
                            <p>My invitations</p>
                            {loaderInvitations
                                ?
                                <p className={styles.pInvitations}><Ring size={16} color="#2F80ED" /></p>
                                :
                                invitations.length > 0
                                ?
                                <p className={styles.pInvitations}>{invitations.length}</p>
                                :
                                null
                            }

                        </div>
                        <span className={styles.borderSettingsUser}></span>
                        <div onClick={() => {
                            setModalSettingsUser(!modalSettingsUser)
                            logOut()
                        }
                        } className={styles.containerLogOut}>
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