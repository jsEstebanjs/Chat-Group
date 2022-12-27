import styles from '../styles/pages/Home.module.scss'
import ContainerChat from '../components/ContainerChat';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../apis/socket';

function Home() {
    const userGroups = useSelector((state) => state.userSlice.groupsId)
    const [flag,setFlag] = useState(false)
    useEffect(() => {
        if(userGroups.length > 0 && !flag){
            for(let i = 0; i<userGroups.length;i++){
                socket.emit("join_room", userGroups[i]._id);
            }
            setFlag(true)
        }
    }, [userGroups])

    return (
        <div className={styles.mainContainerHome}>
            <div className={styles.containerHome}>
                <ContainerChat />
            </div>

        </div>
    )
}
export default Home;