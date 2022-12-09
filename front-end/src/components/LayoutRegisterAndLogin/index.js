import styles from './index.module.scss'
function LayoutRegisterAndLogin({ children }) {
    return (
        <div className={styles.mainContainerLayoutRegisterAndLogin}>
            <div className={styles.containerLayoutRegisterAndLogin}>
                <div className={styles.containerImgH1}>
                    <img src='./chat-icon.png' alt='logo chat group' />
                    <h1>Chat Group</h1>
                </div>
                <div className={styles.containerImgH1}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default LayoutRegisterAndLogin;