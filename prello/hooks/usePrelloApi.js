import { crear_actualizar_tarea, crear_agregar_accion, crear_agregar_estado, crear_agregar_tableros, crear_agregar_tarea, crear_agregar_transicion_posible, crear_agregar_transicion_realizada, crear_cambiar_estado_tarea, crear_eliminar_accion, crear_eliminar_tarea, crear_eliminar_transicion_posible, crear_set_fet_data } from "../data/acciones"
import { useFetchPrelloApi } from "./useFetchPrelloApi"
import { useRealTimeDispatch, useRealTimeSocket } from "./useRealTimeSocket"

export function usePrelloApi(){

    const fetchPrelloApi = useFetchPrelloApi()
    const dispatch = useRealTimeDispatch()

    return {
        getPerfil: async function(){
            dispatch(crear_set_fet_data(true));
            const { tableros } = await fetchPrelloApi('perfil', 'GET')
            dispatch(crear_agregar_tableros(tableros));
            useRealTimeSocket(dispatch, tableros.map(tablero => tablero.id))
        },
        agregarTablero: async function(nombre){
            const nuevo_tablero = await fetchPrelloApi("tableros", "POST", { nombre })
            dispatch(crear_agregar_tableros([nuevo_tablero]))
        },
        agregarEstado: async function(id, nombre){
            const estado = await fetchPrelloApi(`tableros/${id}/estados`,'POST',{ nombre })
            dispatch(crear_agregar_estado(id, estado))
        },
        agregarTarea: async function(TableroId, EstadoId, nuevaTarea){
            const body = { ...nuevaTarea, estado_id: EstadoId, tablero_id: TableroId}
            const tarea_agregada = await fetchPrelloApi(`tableros/${TableroId}/tareas`, 'POST', body)
            dispatch(crear_agregar_tarea(TableroId, tarea_agregada))
        },
        updateTarea: async function(tarea){
            const {id, tablero_id} = tarea
            fetchPrelloApi(`tableros/${tablero_id}/tareas/${id}`, 'POST', { titulo: tarea.titulo, descripcion: tarea.descripcion})
            dispatch(crear_actualizar_tarea(tablero_id, id, tarea))
        },
        deleteTarea: async function(TableroId, TareaId){
            dispatch(crear_eliminar_tarea(TableroId, TareaId))
            fetchPrelloApi(`tableros/${TableroId}/tareas/${TareaId}`, 'DELETE')
        },
        transicionTarea: async function(tableroId, tareaId, estadoFinal){
            dispatch(crear_cambiar_estado_tarea(tableroId, tareaId, estadoFinal));
            const transicion_realiada = await fetchPrelloApi(`tableros/${tableroId}/transiciones`, 'POST', { id_tarea: tareaId, id_estado_final : estadoFinal.id })
            dispatch(crear_agregar_transicion_realizada(tableroId, transicion_realiada));
        },
        agregarTransicionPosible: async function(tableroId, id_estado_inicial, id_estado_final){
            const transicion = {id_estado_inicial, id_estado_final}
            const transicion_agregada = await fetchPrelloApi(`tableros/${tableroId}/transiciones_posibles`, 'POST', transicion)
            dispatch(crear_agregar_transicion_posible(tableroId, transicion_agregada))
        },
        eliminarTransicion: async function(tableroId, transicion_id){
            dispatch(crear_eliminar_transicion_posible(tableroId, transicion_id))
            await fetchPrelloApi(`tableros/${tableroId}/transiciones_posibles/${transicion_id}`, 'DELETE')
        },
        agregarAccion: async function(tableroId, transicion_id, accion){
            const accion_agregada = await fetchPrelloApi(`tableros/${tableroId}/transiciones_posibles/${transicion_id}/acciones`, 'POST', accion)
            dispatch(crear_agregar_accion(tableroId, transicion_id, accion_agregada))
        },
        eliminarAccion: async function(tableroId, transicion_id, accion_id){
            dispatch(crear_eliminar_accion(tableroId, transicion_id, accion_id))
            await fetchPrelloApi(`tableros/${tableroId}/transiciones_posibles/${transicion_id}/acciones/${accion_id}`, 'DELETE')
        },
        getShareLink: async function(TableroId){
            return await fetchPrelloApi(`tableros/shared/${TableroId}`, 'GET')
        },
        joinTablero: async function(EncriptedTableroId){
            return await fetchPrelloApi(`tableros/shared/${EncriptedTableroId}`, 'POST', {})
        }
    }
}