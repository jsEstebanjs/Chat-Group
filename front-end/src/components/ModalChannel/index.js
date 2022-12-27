import styles from './index.module.scss';
import { setInitialStateGroup } from '../../store/groupSlice';
import { useDispatch } from 'react-redux';

function ModalChannel({ funHandle, id, name }) {
    const dispatch = useDispatch()
    return (
        <div onClick={() => {
            dispatch(setInitialStateGroup({_id:id}))
            funHandle(false)
        }} className={styles.mainContainerModalChannel}>
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
            <p>{name}</p>

        </div>
    )
}
export default ModalChannel;