import styles from './index.module.scss';
import { useForm } from "react-hook-form";
import { CreateGroup } from '../../apis/CreateGroup';
import { Ring } from '@uiball/loaders';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { pushNewGroup } from '../../store/userSlice'

function CreateChannel({ handle, visible }) {
    const [loader, setLoader] = useState(false)
    const [error,setError] = useState("")
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const SubmitForm = async (data) => {
        setLoader(true)
        const res = await CreateGroup(data);
        if(res?.data?.data?.name){
            dispatch(pushNewGroup({name:res.data.data.name , _id:res.data.data._id})) 
            handle()
            reset({ name: "", description: "" })
        }else{
            setError("Could not create channel")
            setTimeout(()=>{
                setError("")
            },4000)
        }
        setLoader(false)
    };
    return (
        <>
            <div className={`${styles.mainContainerCreateChannel} ${visible ? styles.mainContainerCreateChannelVisible : null}`}>
                <div onClick={() => {
                    handle(false)
                    reset({ name: "", description: "" })
                }} className={styles.opacity}></div>
                <div className={styles.containerCreateChannel}>
                    {loader
                        ?
                        <div className={styles.containerLoader}>
                            <Ring size={40} color="#2F80ED" />
                        </div>
                        :
                        null

                    }
                    <h3>NEW CHANNEL</h3>
                    <form className={styles.containerForm} onSubmit={handleSubmit(SubmitForm)}>
                        <div className={styles.containerInputsAndErrors}>
                            <input type='text' placeholder='Channel name'
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            {errors.name?.type === "required" && (
                                <p className={styles.errorP}>The channel name is required</p>
                            )}
                        </div>
                        <div className={styles.containerInputsAndErrors}>
                            <textarea placeholder='Channel Description' {...register("description", {
                                required: true,
                            })} />
                            {errors.description?.type === "required" && (
                                <p className={styles.errorP}>The channel description is required</p>
                            )}
                        </div>
                        {error 
                        ?
                        <div className={styles.containerInputsAndErrors}>
                        <p className={styles.errorP}>{error}</p> 
                        </div>
                        :
                        null
                        }

                        <div className={styles.containerBtnSave}>
                            <button type='submit'>Save</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
export default CreateChannel;