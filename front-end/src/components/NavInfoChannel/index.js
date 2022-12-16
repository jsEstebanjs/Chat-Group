import styles from './index.module.scss';
import { MdClose } from "react-icons/md";

function NavInfoChannel({ visible, funHandle }) {
    return (
        <>
            <div onClick={() => funHandle(false)} className={`${styles.opacity} ${visible ? styles.opacityVisible : null}`}></div>
            <div className={`${styles.mainContainerNavInfoChannel} ${visible ? styles.mainContainerNavInfoChannelVisibility : null }`}>
                <div className={styles.containerCloseAndTitle}>
                    <span onClick={() => funHandle(false)}><MdClose /></span>
                    <h3>Group information</h3>
                </div>
                <div className={styles.containerNavInfoChannel}>
                    <div className={styles.containerTitleAndInfo}>
                        <h3>Frontend</h3>
                        <p>Pellentesque sagittis elit enim, sit amet ultrices tellus
                            accumsan quis. In gravida mollis purus, at interdum arcu
                            tempor non </p>
                    </div>
                    <div className={styles.containerMembers}>
                        <h3>MEMBERS</h3>
                    </div>
                </div>
            </div>
        </>
    )

}
export default NavInfoChannel;