import styles from './index.module.scss';
import ModalInvitations from './ModalInvitations';
import { Ring } from '@uiball/loaders'
import { MdOutlineWatchLater } from "react-icons/md";

function MyInvitations({ handle, visible, reload, invitations, loaderInvitations }) {


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