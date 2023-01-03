import styles from './index.module.scss';
import ModalInvitations from './ModalInvitations';
import { useEffect, useState } from 'react';
import { Ring } from '@uiball/loaders'
import socket from '../../apis/socket';
import { MdOutlineWatchLater } from "react-icons/md";

function MyInvitations({ handle, visible, reload, invitations, loaderInvitations, pushInvitation }) {

    useEffect(() => {
        socket.on("receive_invitation", (data) => {
            pushInvitation(data)
        });
        return () => {
            socket.off("receive_invitation")
        }
    }, [socket]);

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
                        invitations.length > 0
                        ?
                        invitations.map((item) => (
                            <ModalInvitations reload={reload} key={item._id} invitationId={item._id} name={item.nameGroup} />
                        ))
                        :
                        <div className={styles.containerWaitingInvitations}>
                            <span><MdOutlineWatchLater/></span>
                            <p>Waiting for invitations...</p>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
export default MyInvitations;