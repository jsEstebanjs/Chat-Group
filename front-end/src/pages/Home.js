import styles from '../styles/pages/Home.module.scss'
import ContainerChat from '../components/ContainerChat';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import socket from '../apis/socket';

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
                <ContainerChat />
            </div>

        </div>
    )
}
export default Home;