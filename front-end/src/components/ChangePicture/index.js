import styles from './index.module.scss'
import { useState } from 'react';
import axios from 'axios';
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { setInitialStateGroup } from '../../store/groupSlice';
import { Ring } from '@uiball/loaders'
import { editGroupUser } from '../../store/userSlice';
import socket from '../../apis/socket';

function ChangePicture({ name, picture, api, idGroup }) {
    const [image, setImage] = useState(null);
    const [objImg, setObjImg] = useState(null);
    const [loader, setLoader] = useState(false)
    const user = useSelector((state) => state.userSlice)
    const dispatch = useDispatch()
    const handleSubmit = async (img) => {
        const data = new FormData();
        for (let i = 0; i < img.length; i++) {
            data.append(`file_${i}`, img[i], img[i].name);
        }

        const res = await axios.post(`${process.env.REACT_APP_URL_BACK}/media`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res;
    };

    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleChange = (event) => {
        readFile(event.target.files[0]);
        setObjImg(event.target.files);
    };
    const cancelChange = () => {
        setImage(null)
        setObjImg(null)
    }
    const updatePicture = async (deletePicture) => {
        setLoader(true);
        if (deletePicture) {
            const res = await api(idGroup, { favicon: "" });
            dispatch(setInitialStateGroup(res.data.data))
            dispatch(editGroupUser({ _id: res.data.data._id, name: res.data.data.name, favicon:res.data.data.favicon }))
            await socket.emit("update_group", res.data.data)
            setObjImg(null);
            setImage(null);
        } else if (objImg !== null) {
            const res = await handleSubmit(objImg);
            const update = await api(idGroup, { favicon: res.data.file_0 });
            dispatch(setInitialStateGroup(update.data.data))
            dispatch(editGroupUser({ _id: update.data.data._id, name: update.data.data.name, favicon:update.data.data.favicon }))
            await socket.emit("update_group", update.data.data)
            setObjImg(null);
            setImage(null);
        }
        setLoader(false);
    };
    return (
        <div className={styles.containerChangePicture}>
            {
                loader
                    ?
                    <div className={styles.mainContainerLoaderPicture}>
                        <div className={styles.loaderPictureOpacityContainer}></div>
                        <div className={styles.containerLoaderPicture}>
                            <Ring size={40} color="#2F80ED" />
                        </div>
                    </div>
                    :
                    null
            }
            {picture || image
                ?
                <img className={styles.imgContainer} src={image ? image : picture} alt={`group image ${name}`} />
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
            {
                user.groupsOwnerId.includes(idGroup)
                    ?
                    <div className={`${styles.containerOptionsPicture} ${image ? styles.containerOptionsPictureNone : null}`}>
                        <div className={styles.opacityPictureChange}></div>


                        <div className={styles.containerOptions}>
                            {
                                picture
                                    ?
                                    <>
                                        <input
                                            id="pictureUser"
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            className={styles.inputDisable}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="pictureUser" className={styles.optionsPictureUpload}>New picture</label>
                                        <p onClick={() => updatePicture(true)} className={styles.optionsPictureDelete}>Delete picture</p>
                                    </>
                                    :
                                    <>
                                        <input
                                            id="pictureUser"
                                            type="file"
                                            accept=".png, .jpg, .jpeg"
                                            className={styles.inputDisable}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="pictureUser" className={styles.optionsPictureUpload}>New picture</label>
                                    </>

                            }
                        </div>


                    </div>
                    :
                    null
            }

            {
                image
                    ?
                    <div className={styles.containerAcceptOrNot}>
                        <span onClick={cancelChange} className={styles.notBtn} >
                            <MdOutlineClose />
                        </span>
                        <span onClick={() => updatePicture(false)} className={styles.acceptBtn}>
                            <MdCheck />
                        </span>
                    </div>
                    :
                    null
            }
        </div>
    )

}
export default ChangePicture;