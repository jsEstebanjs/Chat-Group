import styles from './index.module.scss';
import ModalInvitations from './ModalInvitations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Ring } from '@uiball/loaders'
import socket from '../../apis/socket';

function MyInvitations({ handle, visible }) {
    const [invitations, setInvitations] = useState([])
    const [loaderInvitations, setLoaderInvitations] = useState(true)
    const [fetch, setFetch] = useState(false)

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
                console.log(err)
            })
            .finally(() => {
                setLoaderInvitations(false)
            });
    }, [fetch])


    useEffect(() => {
        socket.on("receive_invitation", (data) => {
            setInvitations((list) => [...list, data])
        });
        return()=>{
            socket.off("receive_invitation")
        }
    }, [socket]);

    const handleFetch = () => {
        setFetch(!fetch)
    }
    return (
        <div className={`${styles.mainContainerMyInvitations} ${visible ? styles.mainContainerMyInvitationsVisible : null}`}>
            <div onClick={() => handle(false)} className={styles.opacity}></div>
            <div className={styles.containerMyInvitations}>
                <h2>My invitations</h2>
                <div className={styles.containerModalInvitations}>
                    {loaderInvitations
                        ?
                        <Ring size={40} color="#120F13" />
                        :
                        invitations.map((item) => (
                            <ModalInvitations reload={handleFetch} key={item._id} invitationId={item._id} name={item.nameGroup} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
export default MyInvitations;