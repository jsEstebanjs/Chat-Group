import styles from '../styles/pages/Home.module.scss'
import ContainerChat from '../components/ContainerChat';
import io from 'socket.io-client'

const socket = io(`${process.env.REACT_APP_URL_BACK }`)

function Home(){
    return(
        <div className={styles.mainContainerHome}>
            <div className={styles.containerHome}>
                <ContainerChat/>
            </div>

        </div>
    )
}
export default Home;