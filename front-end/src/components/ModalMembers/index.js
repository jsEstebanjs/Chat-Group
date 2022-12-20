import { useState,useEffect } from 'react';
import styles from './index.module.scss'

function ModalMembers({ name, owner }) {

    return (
        <div className={styles.mainContainerModalMembers}>
            <div className={styles.containerImgChannel}>
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
            <div className={styles.containerNameAndOwner}>
                <p>{name}</p>
                {owner ? <p className={styles.admin}>Admin</p> : null}
            </div>

        </div>
    )
}
export default ModalMembers;