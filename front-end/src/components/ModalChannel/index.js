import styles from './index.module.scss';
function ModalChannel({ id, name }) {

    return (
        <div className={styles.mainContainerModalChannel}>
            <div className={styles.containerImgChannel}>
                {
                    name.split(" ").length === 1
                        ?
                        `${name.split(" ")[0][0]?.toUpperCase()}`
                        :
                        name.split(" ").length > 1
                            ?
                            `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}`
                            :
                            null
                }
            </div>
            <p>{name}</p>

        </div>
    )
}
export default ModalChannel;