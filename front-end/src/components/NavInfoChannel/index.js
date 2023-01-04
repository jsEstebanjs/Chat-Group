import styles from './index.module.scss';
import { MdClose } from "react-icons/md";
import ModalMembers from '../ModalMembers';
import { useSelector, useDispatch } from 'react-redux';
import { MdAdd, MdLogout, MdDelete } from "react-icons/md";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Ring } from '@uiball/loaders';
import { SendInvitation } from '../../apis/SendInvitation';
import socket from '../../apis/socket';
import UpdateInput from '../UpdateInput';
import { LeaveTheGroup } from '../../apis/LeaveTheGroup';
import { resetToInitialStateGroup } from '../../store/groupSlice';
import { DeleteGroup } from '../../apis/DeleteGroup';
import { validateToken } from '../../apis/ValidateToken';
import { setInitialState } from '../../store/userSlice';

function NavInfoChannel({ visible, funHandle }) {
    const [addMember, setAddMember] = useState(false)
    const [loaderInvitation, setLoaderInvitation] = useState(false)
    const [errorSendInvitation, setErrorSendInvitation] = useState("")
    const [leaveGroup, setLeaveGroup] = useState(false)
    const [deleteGroup, setDeleteGroup] = useState(false)
    const userGroupsOwnerId = useSelector((state) => state.userSlice.groupsOwnerId)
    const group = useSelector((state) => state.groupSlice)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const SubmitForm = async (data) => {
        setLoaderInvitation(true)
        const res = await SendInvitation(group._id, data.email)
        setLoaderInvitation(false)
        if (res?.response?.data?.error) {
            setErrorSendInvitation(res.response.data.error)
            setTimeout(() => {
                setErrorSendInvitation("")
            }, 5000)
        } else {
            await socket.emit("send_update_user", { emailUser: res.data.data.emailUser, action: "send_invitation", data: res.data.data })
            reset({ email: "" })
            setAddMember(false)

        }
    };
    const handleLeaveTheGroup = async (id) => {
        if (leaveGroup === false) {
            setLeaveGroup(true)
            const res = await LeaveTheGroup(id)
            console.log(res)
            await socket.emit("update_group", res.data.data)
            await socket.emit("leave_room", res.data.data._id);
            const resUser = await validateToken()
            dispatch(setInitialState(resUser.data.data));
            dispatch(resetToInitialStateGroup())
            setLeaveGroup(false)
            funHandle(false)
        }
    }
    const handleDeleteGroup = async (id) => {
        if (deleteGroup === false) {
            setDeleteGroup(true)
            const res = await DeleteGroup(id)
            await socket.emit("delete_group", res.data.data._id);
            funHandle(false)
            dispatch(resetToInitialStateGroup())
            const resUser = await validateToken()
            dispatch(setInitialState(resUser.data.data));
            await socket.emit("leave_room", res.data.data._id);
            setDeleteGroup(false)
        }

    }
    return (
        <>
            <div onClick={() => funHandle(false)} className={`${styles.opacity} ${visible ? styles.opacityVisible : null}`}></div>
            <div className={`${styles.mainContainerNavInfoChannel} ${visible ? styles.mainContainerNavInfoChannelVisibility : null}`}>
                <div className={styles.containerCloseAndTitle}>
                    <span onClick={() => funHandle(false)}><MdClose /></span>
                    <h3>Group information</h3>
                </div>
                <div className={styles.containerNavInfoChannel}>
                    <div className={styles.containerInfoAndMembers}>
                        <div className={styles.containerTitleAndInfo}>
                            <UpdateInput keyUpdate="name" maxLength={25} visible={visible} fontSize={20} value={group.name} />
                            <UpdateInput keyUpdate="description" maxLength={300} visible={visible} fontSize={16} value={group.description} />
                        </div>
                        <div className={styles.containerMembers}>
                            <div className={styles.containerAddMember}>
                                <h3>MEMBERS</h3>
                                {
                                    userGroupsOwnerId.includes(group._id) ?
                                        <span onClick={() => setAddMember(!addMember)} className={`${addMember ? styles.iconAdd : null}`}><MdAdd /></span>
                                        :
                                        null

                                }
                            </div>
                            <form onSubmit={handleSubmit(SubmitForm)} className={`${styles.containerInputSendInvitation} ${addMember ? styles.containerInputSendInvitationVisible : null}`}>
                                <input type='text' placeholder='Write an email' {...register("email", {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })} />
                                {errors.email?.type === "required" && (
                                    <p className={styles.errorP}>Write an email</p>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <p className={styles.errorP}>It is not a valid email</p>
                                )}
                                {errorSendInvitation ? <p className={styles.errorSendInvitation}>{errorSendInvitation}</p> : null}
                                <button type='submit'>Send invitation</button>
                                {loaderInvitation
                                    ?
                                    <div className={styles.containerLoader}>
                                        <Ring size={30} color="#2F80ED" />
                                    </div>
                                    :
                                    null
                                }
                            </form >
                            {
                                group.usersId.map((item) => (
                                    <ModalMembers emailUser={item.email} idUser={item._id} owner={group.ownersId.includes(item._id)} key={item._id} name={item.name} />
                                ))

                            }
                        </div>
                    </div>
                    <div className={styles.mainContainerLeaveGroup}>
                        <div onClick={() => handleLeaveTheGroup(group._id)} className={styles.containerLeaveGroup}>
                            <span><MdLogout /></span>
                            <p>Leave the group</p>
                            {leaveGroup
                                ?
                                <div className={styles.containerLoader}>
                                    <Ring size={30} color="#2F80ED" />
                                </div>
                                :
                                null}
                        </div>
                        {userGroupsOwnerId.includes(group._id)
                            ?
                            <div onClick={() => handleDeleteGroup(group._id)} className={styles.containerLeaveGroup}>
                                <span><MdDelete /></span>
                                <p>Delete group</p>
                                {deleteGroup
                                    ?
                                    <div className={styles.containerLoader}>
                                        <Ring size={30} color="#2F80ED" />
                                    </div>
                                    :
                                    null}
                            </div>
                            :
                            null}
                    </div>
                </div>
            </div>
        </>
    )

}
export default NavInfoChannel;