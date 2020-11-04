export const SET_FETCH_DATA = "SET_FETCH_DATA";
export const AGREGAR_TABLEROS = "AGREGAR_TABLEROS";
export const CAMBIAR_NOMBRE = "CAMBIAR_NOMBRE";
export const CAMBIAR_ESTADO_TAREA = "CAMBIAR_ESTADO_TAREA";
export const AGREGAR_TAREA = "AGREGAR_TAREA";
export const ELIMINTAR_TAREA = "ELIMINTAR_TAREA";
export const AGREGAR_ROL = "AGREGAR_ROL";
export const ACTUALIZAR_TAREA = "ACTUALIZAR_TAREA";
export const AGREGAR_ESTADO = "AGREGAR_ESTADO";
export const ELIMINAR_ESTADO = "ELIMINAR_ESTADO";
export const AGREGAR_TRANSICION_POSIBLE = "AGREGAR_TRANSICION_POSIBLE";
export const ELIMINAR_TRANSICION_POSIBLE = "ELIMINAR_TRANSICION_POSIBLE";
export const AGREGAR_TRANSICION_REALIZADA = "AGREGAR_TRANSICION_REALIZADA";

export const crear_set_fet_data = (estado) => {
  return {
    type: SET_FETCH_DATA,
    payload: {
      estado_nuevo: estado,
    },
  };
};

export const crear_cambiar_nombre = (nombre) => {
  return {
    type: CAMBIAR_NOMBRE,
    payload: {
      nombre_nuevo: nombre,
    },
  };
};

export const crear_agregar_tableros = (tableros) => {
  return {
    type: AGREGAR_TABLEROS,
    payload: {
      tableros_nuevos: tableros,
    },
  };
};

export const crear_agregar_roles = (roles) => {
  return {
    type: AGREGAR_ROL,
    payload: {
      roles_nuevos: roles,
    },
  };
};

//ACTUALIZAR TABLERO

export const crear_agregar_tarea = (tablero_id, tarea) => {
  return {
    type: AGREGAR_TAREA,
    payload: {
      tablero_id,
      tarea_nueva: tarea,
    },
  };
};

export const crear_eliminar_tarea = (tablero_id, id_tarea) => {
  return {
    type: ELIMINTAR_TAREA,
    payload: {
      tablero_id,
      id_tarea_eliminada: id_tarea,
    },
  };
};

export const crear_actualizar_tarea = (tablero_id, tarea_id, actualizaciones) => {
  return {
    type: ACTUALIZAR_TAREA,
    payload: {
      tablero_id,
      tarea_id,
      actualizaciones
    }
  }
}

export const crear_cambiar_estado_tarea = (tablero_id, tarea_id, estado_nuevo) => {
  return {
    type: CAMBIAR_ESTADO_TAREA,
    payload: {
      tablero_id,
      tarea_id,
      estado_nuevo,
    },
  };
};

export const crear_agregar_estado = (tablero_id, estado) => {
  return {
    type: AGREGAR_ESTADO,
    payload: {
      tablero_id,
      estado_nuevo: estado,
    },
  };
};

export const crear_eliminar_estado = (tablero_id, estado_id) => {
  return {
    type: ELIMINAR_ESTADO,
    payload: {
      tablero_id,
      id_estado_eliminado: estado_id,
    },
  };
};

export const crear_agregar_transicion_posible = (tablero_id, transicion) => {
    return {
    type: AGREGAR_TRANSICION_POSIBLE,
    payload: {
      tablero_id,
      transicion_nueva: transicion
    },
  };
}

export const crear_eliminar_transicion_posible = (tablero_id, id_transicion_eliminada) => {
    return {
    type: ELIMINAR_TRANSICION_POSIBLE,
    payload: {
      tablero_id,
      id_transicion_eliminada,
    },
  };
}

export const crear_agregar_transicion_realizada = (tablero_id,  transicion_realizada_nueva) => {
  return {
    type: AGREGAR_TRANSICION_REALIZADA,
    payload: {
      tablero_id,
      transicion_realizada_nueva
    }
  }
}