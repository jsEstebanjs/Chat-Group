import styles from '../styles/pages/Home.module.scss'
import ContainerChat from '../components/ContainerChat';
import io from 'socket.io-client'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const socket = io.connect(`${process.env.REACT_APP_URL_BACK}`)

function Home() {
    const channelId = useSelector((state) => state.channelIdSlice.id)

    useEffect(() => {
        if(channelId !== ""){
            socket.emit("join_room", channelId);
        }
    }, [channelId])
    return (
        <div className={styles.mainContainerHome}>
            <div className={styles.containerHome}>
                <ContainerChat socket={socket} />
            </div>

        </div>
    )
}
export default Home;