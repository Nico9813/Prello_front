import styles from "../styles/TareaModal.module.css";
import { useState } from "react";
import Modal from './Modal'

export default function TareaModal({isOpen, tareaInicial = {}, rolesPosibles = [], onClose=() => {}, onSubmit=() => {}, onDelete=() =>{}}) {
  const [tarea, setTarea] = useState(tareaInicial)

  const tablero_id = tarea.tablero_id ?? -1
  const id = tarea.id ?? -1
  const titulo = tarea.titulo ?? ''
  const descripcion = tarea.descripcion ?? ''
  const estadosPosibles = tarea.estados_posibles ?? []
  const roles = tarea.roles ?? []

  const actualizar_roles = (roles_modificados) => {
    const tarea_final = {...tarea, roles:roles_modificados}
    setTarea(tarea_final)
    onSubmit(tarea_final)
  }

  const quitar_rol = (rol) => {
    const roles_modificados = [...roles].filter(rol_actual => rol_actual.id != rol.id)
    actualizar_roles(roles_modificados)
  }

  const agregar_rol = (rol) => {
    const roles_modificados = [...roles, rol]
    actualizar_roles(roles_modificados)
  }


  return (
      <Modal isOpen={isOpen} onClose={() => {onSubmit(tarea); onClose()}} height="70%" width="80%">
        <div className={styles.modalInnerContainer}>
          <div className={styles.leftContainer}>
            <input className={styles.titulo} value={titulo} onChange={ event => setTarea({...tarea, titulo: event.target.value})}/>
            <textarea className={styles.descripcionModal} value={descripcion} onChange={ event => setTarea({...tarea, descripcion: event.target.value})}/>
          </div>
          <div className={styles.rightContainer}>
            <div>
              {tareaInicial && 
                <div className={styles.button} style={{backgroundColor: 'red'}} onClick={()=> {onDelete(tablero_id, id); onClose()}}>
                  <b>Eliminar tarea</b>
                </div>
              }
              <div className={styles.roles}>
                <p>Roles Asignados</p>
                {rolesPosibles.map( (rol, index) => 
                  {
                    const tiene_rol = roles.map(rol => rol.id).includes(rol.id)
                    return(
                      <h6 
                        key={index} 
                        className={styles.rol}
                        style={{ opacity: tiene_rol ? 1 : 0.5}}
                        onClick={() => tiene_rol? quitar_rol(rol) : agregar_rol(rol) }
                      >{rol.nombre}</h6>
                    )
                    
                  }
                )}
              </div>
              
            </div>
            {tareaInicial &&             
              <div>
                {estadosPosibles.map((estado, index) => 
                  <div key={index} className={styles.button} onClick={()=> setTarea({...tarea, estado})}><b>{estado.nombre}</b></div>
                )}
            </div>}
          </div>
        </div>
      </Modal>
  );
}
