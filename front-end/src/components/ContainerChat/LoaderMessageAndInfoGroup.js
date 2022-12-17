import styles from './loaderMessageAndInfoGroup.module.scss';
import { DotWave } from '@uiball/loaders';
import Logo from '../../images/chat-icon.png';

function LoaderMessageAndInfoGroup(){
    return(
        <div className={styles.mainContainerLoaderMessageAndInfoGroup}>
            <img src={Logo} alt='Logo' />
            <p>Loading your messages</p>
            <DotWave size={40} color="#120F13" />
        </div>
    )
}
export default LoaderMessageAndInfoGroup;