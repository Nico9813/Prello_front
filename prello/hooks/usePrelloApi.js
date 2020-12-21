import { crear_agregar_tableros } from "../data/acciones"
import { useFetchPrelloApi } from "./useFetchPrelloApi"
import { useRealTimeDispatch } from "./useRealTimeSocket"


export function usePrelloApi(){

    const fetchPrelloApi = useFetchPrelloApi()
    const dispatch = useRealTimeDispatch()

    return {
        crearTablero: async function(nombre){
            const body = { nombre }
            console.log(body)
            const nuevo_tablero = await fetchPrelloApi("tableros", "POST", body)
            dispatch(crear_agregar_tableros([nuevo_tablero]))
        }
    }
}