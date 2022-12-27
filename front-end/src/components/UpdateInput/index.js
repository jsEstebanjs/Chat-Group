import styles from './index.module.scss'
import { MdModeEdit, MdCheck, MdOutlineClose } from "react-icons/md";
import { useEffect, useState, useRef } from 'react';
import useAutosizeTextArea from "./useAutosizeTextArea";
import { UpdateGroup } from '../../apis/UpdateGroup';
import { useSelector, useDispatch } from 'react-redux';
import { Ring } from '@uiball/loaders'
import socket from '../../apis/socket';
import { setInitialStateGroup } from '../../store/groupSlice';
import { editGroupUser } from '../../store/userSlice';

function UpdateInput({ visible, value, fontSize, maxLength, keyUpdate }) {
    const [inputVisible, setInputVisible] = useState(false);
    const [valueInput, setValueInput] = useState(value)
    const [length, setLength] = useState(false)
    const [required, setRequired] = useState(false)
    const [loader, setLoader] = useState(false)
    const textAreaRef = useRef()
    const groupId = useSelector((state) => state.groupSlice._id)
    const userGroupsOwnerId = useSelector((state) => state.userSlice.groupsOwnerId)
    const dispatch = useDispatch()


    useEffect(() => {
        setInputVisible(false)
        setValueInput(value)
    }, [visible, value])

    const handleUpdate = async () => {
        if (!length && !required && valueInput !== value) {
            setLoader(true)
            const res = await UpdateGroup(groupId, { [keyUpdate]: valueInput })
            await socket.emit("update_group", res.data.data)
            dispatch(setInitialStateGroup({ [keyUpdate]: res.data.data[keyUpdate] }))
            dispatch(editGroupUser({ _id: res.data.data._id, name: res.data.data.name }))
            setLoader(false)
            setInputVisible(false)
        } else {
            setInputVisible(false)
        }
    }
    const onChangueTextArea = (e) => {
        if (e.target.value.length > maxLength) {
            setLength(true)
        } else if (e.target.value.length === 0 || e.target.value.trim().length === 0) {
            setValueInput(e.target.value)
            setLength(false)
            setRequired(true)
        } else {
            setValueInput(e.target.value)
            setRequired(false)
            setLength(false)
        }
    }
    useAutosizeTextArea(textAreaRef.current, valueInput);
    return (
        <div className={styles.containerColum}>
            <div className={styles.mainContainerUpdateInput}>
                {
                    loader
                        ?
                        <div className={styles.containerLoaderInputUpdate}>
                            <Ring size={20} color="#2F80ED" />
                        </div>
                        :
                        null
                }
                {
                    inputVisible
                        ?
                        <>
                            <textarea
                                rows="1"
                                ref={textAreaRef}
                                value={valueInput}
                                style={{ fontSize: `${fontSize}px`, }}
                                onChange={(e) => onChangueTextArea(e)}
                            />
                            <span className={styles.containerCheck} onClick={() => handleUpdate()}>
                                <MdCheck />
                            </span>
                            <span className={styles.containerCheck} onClick={() => {
                                setInputVisible(false)
                                setValueInput(value)
                                setLength(false)
                                setRequired(false)
                            }}>
                                <MdOutlineClose />
                            </span>
                        </>
                        :
                        <>
                            <p style={{ fontSize: `${fontSize}px`, }}>{value}</p>
                            {userGroupsOwnerId.includes(groupId) ?
                                <span onClick={() => setInputVisible(true)}>
                                    <MdModeEdit />
                                </span>
                                :
                                null
                            }
                        </>
                }

            </div>
            {length
                ?
                <p className={styles.pErrorsUpdate}>Maximum length of 25</p>
                :
                null
            }
            {
                required
                    ?
                    <p className={styles.pErrorsUpdate}>The field is required</p>
                    :
                    null
            }
        </div>
    )
}
export default UpdateInput;