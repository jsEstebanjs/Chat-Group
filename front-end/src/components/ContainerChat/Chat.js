import styles from './chat.module.scss';
import { MdSend } from "react-icons/md";
import { useState } from 'react';

function Chat(){
    const [valueMessage,setValueMessage] = useState("")
    const handleMessage=(e)=>{
        e.preventDefault()
        console.log(valueMessage)
        setValueMessage("")
    }
    return(
    <div className={styles.mainContainerChat}>
        <div className={styles.containerChat}>
            <h2>hola</h2>
        </div>
        <form onSubmit={(e)=> handleMessage(e)} className={styles.mainContainerInputChat}>
            <input onChange={(e)=>setValueMessage(e.target.value)} value={valueMessage} type='text' placeholder='Type a message here' />
            <button type='submit'><MdSend/></button>
        </form>
    </div>
    )

}
export default Chat;