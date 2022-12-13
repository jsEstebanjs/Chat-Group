import styles from './index.module.scss';
import { useForm } from "react-hook-form";

function CreateChannel({ handle, visible }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const SubmitForm = async (data) => {
        console.log(data)
        reset({name:"",description:""})
    };
    return (
        <>
            <div className={`${styles.mainContainerCreateChannel} ${visible ? styles.mainContainerCreateChannelVisible : null}`}>
                <div onClick={()=> {
                    handle(false)
                    reset({name:"",description:""})
                }} className={styles.opacity}></div>
                <div className={styles.containerCreateChannel}>
                    <h3>NEW CHANNEL</h3>
                    <form className={styles.containerForm} onSubmit={handleSubmit(SubmitForm)}>
                        <div className={styles.containerInputsAndErrors}>
                            <input type='text' placeholder='Channel name'
                                {...register("name", {
                                    required: true,
                                    // pattern:/^[A-ZÑÁÉÍÓÚÜa-zñáéíóú0-9\s ]+$/g
                                })}
                            />
                            {errors.name?.type === "required" && (
                                <p className={styles.errorP}>The channel name is required</p>
                            )}
                        </div>
                        <div className={styles.containerInputsAndErrors}>
                            <textarea placeholder='Channel Description' {...register("description", {
                                required: true,
                                // pattern:/^[A-ZÑÁÉÍÓÚÜa-zñáéíóú0-9\s ]+$/g
                            })} />
                            {errors.description?.type === "required" && (
                                <p className={styles.errorP}>The channel description is required</p>
                            )}
                        </div>
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