import styles from '../styles/pages/Home.module.scss'
import ContainerChat from '../components/ContainerChat';
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