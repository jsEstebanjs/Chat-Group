import styles from './index.module.scss';
import Logo from '../../images/chat-icon.png';
import { DotWave } from '@uiball/loaders'


function BigLoaderChatGroup(){
    return(
    <div className={styles.mainContainerBigLoaderChatGroup}>
        <img src={Logo} alt='Logo' />
        <p>ChatGroup messaging 24 hours</p>
        <DotWave size={40} color="#3C393F" />
    </div>
    )

}
export default BigLoaderChatGroup;