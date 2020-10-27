import { combineReducers } from "redux";
import * as Acciones from "./acciones";

const tarea_reducer = (tarea = { id: -1 }, accion) => {

  if(tarea.id != accion.payload.tarea_id) return {...tarea}

  switch (accion.type) {
    case Acciones.ACTUALIZAR_TAREA: 
      tarea = {...tarea, ...accion.payload.actualizaciones}
      break;
    case Acciones.CAMBIAR_ESTADO_TAREA:
      tarea.estado = accion.payload.estado_nuevo
      break;
  }

  return {
    ...tarea,
  };
};

const tablero_reducer = (tablero = { id:-1, tareas: [] }, accion) => {

  if(tablero.id != accion.payload.tablero_id) return {...tablero}

  switch (accion.type) {
    case Acciones.AGREGAR_TAREA:
      tablero.tareas = [...tablero.tareas, accion.payload.tarea_nueva];
      break;
    case Acciones.ELIMINTAR_TAREA:
      tablero.tareas = [...tablero.tareas.filter( tarea => tarea.id != accion.payload.id_tarea_eliminada)]
      break;
    case Acciones.AGREGAR_ESTADO:
      tablero.estados = [...tablero.estados, accion.payload.estado_nuevo]
      break;
    case Acciones.ELIMINAR_ESTADO:
      tablero.tareas = [...tablero.tareas.filter( estado => estado.id != accion.payload.id_estado_eliminado)]
      break;
    case Acciones.AGREGAR_TRANSICION_POSIBLE:
      const {transicion_nueva: {estado_inicial, estado_final, acciones}, transicion_nueva} = accion.payload

      let transaccion_actual = tablero.workflow.transiciones_posibles.find(tr => tr.estado_inicial.id == estado_inicial.id && tr.estado_final.id == estado_final.id)

      if(transaccion_actual){
        transaccion_actual.acciones.concat(acciones)
      }else{
        tablero.workflow.transiciones_posibles = [...tablero.workflow.transiciones_posibles, transicion_nueva]
      }
      break;
    case Acciones.ELIMINAR_TRANSICION_POSIBLE:
      const { id_transicion_eliminada } = accion.payload
      tablero.workflow.transiciones_posibles = [...tablero.workflow.transiciones_posibles.filter(tr => tr.id != id_transicion_eliminada)]
      break;
  }

  return {
    ...tablero,
    tareas: [...tablero.tareas.map((tarea) => tarea_reducer(tarea, accion))]
  };
};

const roles_reducer = (roles = [], accion) => {
  switch (accion.type) {
    case Acciones.AGREGAR_ROL: {
      roles = [...roles, accion.payload.nuevo_rol];
      break;
    }
  }

  return [...roles];
};

const perfil_reducer = (
  perfil = { nombre: "", tableros: [], roles: [] },
  accion
) => {
  switch (accion.type) {
    case Acciones.CAMBIAR_NOMBRE: {
      perfil.nombre = accion.payload.nuevo_nombre;
      break;
    }
    case Acciones.AGREGAR_TABLEROS: {
      perfil.tableros = perfil.tableros.concat(accion.payload.tableros_nuevos);
      break;
    }
  }

  return {
    ...perfil,
    tableros: [...perfil.tableros].map((tablero) =>
      tablero_reducer(tablero, accion)
    ),
    roles: roles_reducer(perfil.roles, accion),
  };
};

const fetch_reducer = (isFetched = false, accion) => {
  return accion.type == Acciones.SET_FETCH_DATA
    ? accion.payload.estado_nuevo
    : isFetched;
};

let rootReducer = combineReducers({
  perfil: perfil_reducer,
  isFetched: fetch_reducer,
});

export { rootReducer };
