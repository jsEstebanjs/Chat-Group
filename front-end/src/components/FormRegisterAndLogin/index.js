import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { LoginAndRegister } from "../../apis/LoginAndRegister";
import Cookies from 'js-cookie';
import { Ring } from '@uiball/loaders'
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { setInitialState } from "../../store/userSlice";


function FormRegisterAndLogin({ name, title, link, textLink, message, url }) {
    const [loader, setLoader] = useState(false)
    const [errorFecth, setErrorFecth] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fecthError = (value) => {
        setErrorFecth(value)
        setTimeout(() => {
            setErrorFecth("")
        }, [4000])

    }
    const SubmitForm = async (data) => {
        setLoader(true)
        const res = await LoginAndRegister(url, data)
        if (res?.data?.data?.token) {
            Cookies.set("token", res.data.data.token)
            dispatch(setInitialState({ name: res.data.data.name, email: res.data.data.email, groupsId: res.data.data.groupsId, groupsOwnerId: res.data.data.groupsOwnerId }))
            navigate('/')
        } else {
            if (res.response?.data?.data?.errors?.email?.message) {
                fecthError(res.response.data.data.errors.email.message)
            } else if (res.response?.data?.data) {
                fecthError(res.response.data.data)
            } else {
                fecthError(`Could not ${title} try again`)
            }
        }
        setLoader(false)
    };
    return (
        <>
            <h2 className={styles.titleFormRegisterAndLogin}>{title}</h2>
            <form className={styles.mainContainerFormRegisterAndLogin} onSubmit={handleSubmit(SubmitForm)}>
                {
                    loader
                        ?
                        <div className={styles.containerLoaderForm}>
                            <Ring size={40} color="#120F13" />
                        </div>
                        :
                        null
                }
                {
                    name
                        ?
                        <div className={styles.containerLabelInput}>
                            <label htmlFor='name'>Name</label>
                            <input id='name' type='text' placeholder='Your name'
                                {...register('name', {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 100,
                                    pattern: /^([A-ZÑÁÉÍÓÚÜ]||[a-zñáéíóú]+[\s]*)+$/,
                                })} />
                            {errors.name?.type === "required" && (
                                <p className={styles.errorP}>Name is required</p>
                            )}
                            {errors.name?.type === "minLength" && (
                                <p className={styles.errorP}>Minimum length of 3</p>
                            )}
                            {errors.name?.type === "maxLength" && (
                                <p className={styles.errorP}>Maximum length of 100</p>
                            )}
                            {errors.name?.type === "pattern" && (
                                <p className={styles.errorP}>Invalid name</p>
                            )}
                        </div>
                        :
                        null
                }
                <div className={styles.containerLabelInput}>
                    <label htmlFor='email'>Email</label>
                    <input id='email' type='email' placeholder='Your email'
                        {...register('email', {
                            required: true,
                            pattern: /\S+@\S+\.\S+/,
                        })} />
                    {errors.email?.type === "required" && (
                        <p className={styles.errorP}>Email is required</p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className={styles.errorP}>Invalid email</p>
                    )}
                </div>
                <div className={styles.containerLabelInput}>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' placeholder='Your password'
                        {...register('password', {
                            required: true,
                            minLength: 8,
                            maxLength: 16,
                            pattern: /^([A-ZÑÁÉÍÓÚÜ0-9]||[a-zñáéíóú0-9])+$/,
                        })} />
                    {errors.password?.type === "required" && (
                        <p className={styles.errorP}>Password is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                        <p className={styles.errorP}>Minimum length of 8</p>
                    )}
                    {errors.password?.type === "maxLength" && (
                        <p className={styles.errorP}>Maximum length of 16</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className={styles.errorP}>Only letters and numbers</p>
                    )}
                </div>
                {errorFecth ? <p className={styles.errorFetch}>{errorFecth}</p> : null}
                <button className={styles.buttonFormRegisterAndLogin}>{title}</button>
            </form>
            <p>{message}</p>
            <Link className={styles.linkFormRegisterAndLogin} to={link}> {textLink}</Link>
        </>
    )
}
export default FormRegisterAndLogin;