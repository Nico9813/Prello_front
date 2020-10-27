import { useDispatch } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export async function useRealTimeSocket(dispatch, ids_tableros) {
    const client = new W3CWebSocket('ws://127.0.0.1:8000');

    client.onopen = () => {
        ids_tableros.map( tablero_id => 
            client.send(JSON.stringify({ type:'NUEVA_CONEXION', payload: { tablero_id } }))
        )
    };

    client.onmessage = (message) => {
        const accion = JSON.parse(message.data.toString())
        console.log(accion)
        dispatch(accion)
    };
}

export function useRealTimeDispatch(){
    const dispatch = useDispatch()
    
    return async function(accion){
        dispatch(accion)
        const client = new W3CWebSocket('ws://127.0.0.1:8000');
        client.onopen = () => client.send(JSON.stringify(accion))
    }
}
