export const SET_FETCH_DATA = "SET_FETCH_DATA";
export const AGREGAR_TABLEROS = "AGREGAR_TABLEROS";
export const CAMBIAR_NOMBRE = "CAMBIAR_NOMBRE";
export const CAMBIAR_ESTADO_TAREA = "CAMBIAR_ESTADO_TAREA";
export const AGREGAR_TAREA = "AGREGAR_TAREA";
export const ELIMINTAR_TAREA = "ELIMINTAR_TAREA";
export const AGREGAR_ROL = "AGREGAR_ROL";
export const ACTUALIZAR_TAREA = "ACTUALIZAR_TAREA";

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

export const crear_actualizar_tarea = (tarea_id, actualizaciones) => {
  return {
    type: ACTUALIZAR_TAREA,
    payload: {
      tarea_id,
      actualizaciones
    }
  }
}

export const crear_cambiar_estado_tarea = (tarea_id, estado_nuevo) => {
  return {
    type: CAMBIAR_ESTADO_TAREA,
    payload: {
      tarea_id,
      estado_nuevo,
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

export const crear_agregar_tarea = (id_tablero, tarea) => {
  return {
    type: AGREGAR_TAREA,
    payload: {
      id_tablero: id_tablero,
      tarea_nueva: tarea,
    },
  };
};

export const crear_eliminar_tarea = (id_tablero, id_tarea) => {
  return {
    type: ELIMINTAR_TAREA,
    payload: {
      id_tablero: id_tablero,
      id_tarea_eliminada: id_tarea,
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
