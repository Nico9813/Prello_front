import { useEffect, useState } from "react";
import { usePrelloApi } from "../hooks/usePrelloApi";
import styles from "../styles/Share.module.css";

export const Share = ({TableroId}) => {

    const { getShareLink } = usePrelloApi()
    const [shareLink, setshareLink] = useState()
    const [msg, setMsg] = useState('Copy Share link')

    useEffect(() => {
        (async () => {
            const response = await getShareLink(TableroId)
            setshareLink(`http://localhost:3000/tableros/shared/${response.id}`)
        })()
    },[])

    const copyShareLink = () => {
        navigator.clipboard.writeText(shareLink)
        setMsg('Copied!')
        setTimeout(() => setMsg('Copy Share link'), 2000)
    }

    return (
        <div className={styles.container}>
            {
                <button disabled={!shareLink} className={styles.boton} onClick={copyShareLink}>{msg}</button>
            }
        </div>
  );
};
