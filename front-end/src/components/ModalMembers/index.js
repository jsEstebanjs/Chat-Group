import styles from './index.module.scss'
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { AdminOptions } from '../../apis/AdminOptions';
import { Ring } from '@uiball/loaders'
import socket from '../../apis/socket';
import { setInitialStateGroup } from '../../store/groupSlice';

function ModalMembers({ name, owner, idUser, emailUser }) {
    const user = useSelector((state) => state.userSlice)
    const groupId = useSelector((state) => state.groupSlice._id)
    const [modalOptions, setModalOptions] = useState(false)
    const [loaderOptions, setLoaderOptions] = useState(false)
    const ref = useOutsideClick(setModalOptions)
    const dispatch = useDispatch()

    const handleAdminOptions = async (idUser, action) => {
        const actionSocket = action === "deleteUser" ? "removed_from_group" : "update_range_group"
        setLoaderOptions(true)
        const res = await AdminOptions(groupId, { idUser, action })
        dispatch(setInitialStateGroup(res.data.data))
        await socket.emit("send_update_user", { emailUser: emailUser, action: actionSocket, data: res.data.data })
        setLoaderOptions(false)
        setModalOptions(false)
    }

    return (
        <div className={styles.mainContainerModalMembers}>
            <div className={styles.containerImgAndName}>
                <div className={styles.containerImgChannel}>
                    {
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
                <div className={styles.containerNameAndOwner}>
                    <p>{name}</p>
                    {owner ? <p className={styles.admin}>Admin</p> : null}
                </div>
            </div>
            {user.groupsOwnerId.includes(groupId) && emailUser !== user.email
                ?
                <div className={styles.containerBtnOptionsAdmin}>
                    <span onClick={() => setModalOptions(!modalOptions)}>
                        <MdKeyboardArrowDown />
                    </span>
                </div>
                :
                null
            }
            {modalOptions
                ?
                <div ref={ref} className={styles.containerOptionsAdmin}>
                    {
                        loaderOptions
                            ?
                            <div className={styles.containerLoader}>
                                <Ring size={40} color="#2F80ED" />
                            </div>
                            :
                            null
                    }
                    {owner
                        ?
                        <p onClick={() => handleAdminOptions(idUser, "descend")}>Demote from admin</p>
                        :
                        <p onClick={() => handleAdminOptions(idUser, "ascend")}> Promote to admin</p>
                    }
                    <p onClick={() => handleAdminOptions(idUser, "deleteUser")}>Delete</p>
                </div>
                :
                null}

        </div>
    )
}
export default ModalMembers;