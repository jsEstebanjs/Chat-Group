import styles from './modalInvitations.module.scss';
import { DeleteInvitation } from '../../apis/DeleteInvitation';
import { Ring } from '@uiball/loaders'
import { useState } from 'react';
import { AcceptInvitation } from '../../apis/AcceptInvitation';
import { acceptGroup } from '../../store/userSlice';
import { useDispatch } from 'react-redux'
import socket from '../../apis/socket'

function ModalInvitations({ reload, name, invitationId, favicon }) {
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch()

    const handleDelete = async () => {
        try{
            setLoader(true)
            const res = await DeleteInvitation(invitationId)
            reload()
        }catch(err){
            reload()
        }finally{
            setLoader(false)
        }

    }
    const handleAccept = async () => {
        try{
            setLoader(true)
            const res = await AcceptInvitation(invitationId)
            console.log(res)
            socket.emit("join_room", res.data.data._id);
            dispatch(acceptGroup({ name: res.data.data.name, _id: res.data.data._id, favicon:res.data.data.favicon }))
            await socket.emit("update_group",res.data.data)
            reload()
        }catch(err){
            reload()
        }finally{
            setLoader(false)
        }

    }

    return (
        <div className={styles.mainContainerModalInvitations}>
            {loader ?
                <div className={styles.containerLoader}>
                    <Ring size={40} color="#120F13" />
                </div>
                :
                null}
            <div className={styles.containerName}>
                {
                    favicon
                    ?
                    <img className={styles.imgModalInvitations} src={favicon} alt={`group picture ${name}`} />
                    :
                    name.trim().split(" ").length === 1
                        ?
                        `${name.trim().split(" ")[0][0]?.toUpperCase()}`
                        :
                        name.trim().split(" ").length > 1
                            ?
                            `${name.trim().split(" ")[0][0]?.toUpperCase()}${name.trim().split(" ")[1][0]?.toUpperCase()}`
                            :
                            null
                }

            </div>
            <div className={styles.containerNameAndBtns}>
                <p>{name}</p>
                <div className={styles.containerBtns}>
                    <button onClick={handleAccept} className={styles.btnAccept}>Accept</button>
                    <button onClick={handleDelete} className={styles.btnRemove}>Remove</button>
                </div>

            </div>

        </div>
    )
}
export default ModalInvitations;