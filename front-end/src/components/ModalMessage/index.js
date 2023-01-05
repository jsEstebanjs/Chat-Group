import { forwardRef } from 'react';
import styles from './index.module.scss';

const ModalMessage =forwardRef((props,ref) =>{
    const newDate = new Date(props.date)
    return (
        <div ref={ref ? ref : null} className={styles.mainContainerModalMessage}>
            <div className={styles.containerImgOrName}>
                {
                    props.name.trim().split(" ").length === 1
                        ?
                        `${props.name.trim().split(" ")[0][0]?.toUpperCase()}`
                        :
                        props.name.trim().split(" ").length > 1
                            ?
                            `${props.name.trim().split(" ")[0][0]?.toUpperCase()}${props.name.trim().split(" ")[1][0]?.toUpperCase()}`
                            :
                            null
                }
            </div>
            <div className={styles.containerNameAndMessage}>
                <div className={styles.containerNameAndDate}>
                    <p className={styles.name}>{props.name}</p>
                    <p className={styles.date}>
                        {`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()}`}</p>
                </div>
                <div className={styles.containerMessage}>
                    <p className={styles.message}>{props.message}</p>
                </div>
            </div>

        </div>
    )
})
export default ModalMessage;