import styles from './index.module.scss'
import { MdModeEdit, MdCheck } from "react-icons/md";
import { useEffect, useState, useRef } from 'react';
import useAutosizeTextArea from "./useAutosizeTextArea";

function UpdateInput({ visible, value, key, fontSize }) {
    const [inputVisible, setInputVisible] = useState(false);
    const [valueInput, setValueInput] = useState(value)
    const textAreaRef = useRef()

    useEffect(() => {
        setInputVisible(false)
        setValueInput(value)
    }, [visible, value])

    const handleUpdate = () => {
        if(valueInput !== value && valueInput.trim().lenght > 0 ){
            setInputVisible(false)
            setValueInput(value)
        }
    }
    useAutosizeTextArea(textAreaRef.current, valueInput);
    return (
        <div className={styles.mainContainerUpdateInput}>
            {
                inputVisible
                    ?
                    <>
                        <textarea
                            rows="1"
                            value={valueInput}
                            ref={textAreaRef}
                            onChange={(e) => setValueInput(e.target.value)}
                            style={{ fontSize: `${fontSize}px`, }}
                        />
                        <span className={styles.containerCheck} onClick={() => handleUpdate()}>
                            <MdCheck />
                        </span>
                    </>
                    :
                    <>
                        <p style={{ fontSize: `${fontSize}px`, }}>{value}</p>
                        <span onClick={() => setInputVisible(true)}>
                            <MdModeEdit />
                        </span>
                    </>
            }

        </div>
    )
}
export default UpdateInput;