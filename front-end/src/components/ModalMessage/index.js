import styles from './index.module.scss';

function ModalMessage({ name, date, message }) {
    const newDate = new Date(date)
    return (
        <div className={styles.mainContainerModalMessage}>
            <div className={styles.containerImgOrName}>
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
            <div className={styles.containerNameAndMessage}>
                <div className={styles.containerNameAndDate}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.date}>
                        {`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()}`}</p>
                </div>
                <div className={styles.containerMessage}>
                    <p>{message}</p>
                </div>
            </div>

        </div>
    )
}
export default ModalMessage;