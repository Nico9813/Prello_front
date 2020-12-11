import styles from "../styles/AddAccionModal.module.css";
import { useState } from "react";
import Modal from './Modal'

export default function AddAccionModal({isOpen, onClose}) {

    const tabs = ["HEADER","BODY"]
    const [tabActual, setTabActual] = useState(0)

    const [body, setBody] = useState(JSON.stringify({}, null, 4))


    const renderTab = () => {
        return({
            "HEADER": <textarea className={styles.textArea} style={{backgroundColor:"grey"}}></textarea>,
            "BODY": <textarea className={styles.textArea} value={body} onChange={evt => setBody(evt.target.value)} style={{backgroundColor:"green"}}></textarea>,
        }[tabs[tabActual]])
    }

    return (
      <Modal isOpen={isOpen} onClose={() => onClose()} height="60%" width="45%">
        <div className={styles.container}>
            <p>Nueva Accion</p>
            <div className={styles.inputContainer}>
                <label>Tipo</label>
                <input value="WebHook" disabled={true}/>
            </div>
            <div className={styles.inputContainer}>
                <label>Url</label>
                <input></input>
            </div>
            <div className={styles.inputContainer}>
            <label>Metodo</label>
                <select>
                    <option>POST</option>
                    <option>GET</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                </select>
            </div>
            <div className={styles.tabContainer}>
                {tabs.map( (tab, index) => <button className={(index == tabActual)? styles.selected : styles.tab} onClick={() => setTabActual(index)}>{tab}</button>)}
            </div>
            {renderTab()}
        </div>
      </Modal>
    );
}