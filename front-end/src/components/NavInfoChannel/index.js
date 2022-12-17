import styles from './index.module.scss';
import { MdClose } from "react-icons/md";
import ModalMembers from '../ModalMembers';
import { useSelector } from 'react-redux';
import { MdAdd } from "react-icons/md";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Ring } from '@uiball/loaders';

function NavInfoChannel({ groupInfo, visible, funHandle }) {
    const [addMember, setAddMember] = useState(false)
    const [loaderInvitation, setLoaderInvitation] = useState(false)
    const userGroupsOwnerId = useSelector((state) => state.userSlice.groupsOwnerId)
    const groupId = useSelector((state) => state.channelIdSlice.id)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const SubmitForm = async (data) => {
        reset({ email: "" })
        setLoaderInvitation(true)
        setAddMember(false)
        setLoaderInvitation(false)
    };
    return (
        <>
            <div onClick={() => funHandle(false)} className={`${styles.opacity} ${visible ? styles.opacityVisible : null}`}></div>
            <div className={`${styles.mainContainerNavInfoChannel} ${visible ? styles.mainContainerNavInfoChannelVisibility : null}`}>
                <div className={styles.containerCloseAndTitle}>
                    <span onClick={() => funHandle(false)}><MdClose /></span>
                    <h3>Group information</h3>
                </div>
                <div className={styles.containerNavInfoChannel}>
                    <div className={styles.containerTitleAndInfo}>
                        <h3>{groupInfo.name}</h3>
                        <p>{groupInfo.description}</p>
                    </div>
                    <div className={styles.containerMembers}>
                        <div className={styles.containerAddMember}>
                            <h3>MEMBERS</h3>
                            {
                                userGroupsOwnerId.includes(groupId) ?
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
                            groupInfo?.usersId?.map((item) => (
                                <ModalMembers owner={userGroupsOwnerId.includes(groupId)} key={item._id} name={item.name} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )

}
export default NavInfoChannel;