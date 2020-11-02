import { useEffect, useState } from "react";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import styles from "../styles/Share.module.css";

export const Share = ({TableroId}) => {

    const fetchPrelloApi = useFetchPrelloApi()
    const [shareLink, setshareLink] = useState()

    useEffect(() => {
        (async () => {
            const response = await fetchPrelloApi(`tableros/shared/${TableroId}`, 'GET')
            setshareLink(`http://localhost:3000/tableros/shared/${response.id}`)
        })()
    },[])

    return (
        <div className={styles.container}>
            { shareLink && 
                <div>
                    <label style={{margin:5}}>Share link: </label>
                    <input disabled={true} value={shareLink}/> 
                    <button onClick={() => navigator.clipboard.writeText(shareLink)}>Copy</button>
                </div>
            }
        </div>
  );
};
