import styles from "../styles/TareaModal.module.css";
import ReactModal from "react-modal";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { crear_eliminar_tarea } from "../data/acciones";
import Modal from './Modal'

export default function TareaModal({isOpen, tareaInicial, onClose, onForceClose=()=>{}}) {
  const fetchPrelloApi = useFetchPrelloApi()
  const dispatch = useDispatch()

  const [tarea, setTarea] = useState(tareaInicial)
  const [isLoading, setIsLoading] = useState(true)
  const [estadosPosibles, setEstadosPosibles] = useState([])

  useEffect(() => {
    if(tareaInicial){
      async function fetchPosiblesEstados(){
        const {tablero_id, estado} = tareaInicial
        const path = `/tableros/${tablero_id}/estados/${estado.id}/posibles`
        const posibles = await fetchPrelloApi(path, 'GET')
        setIsLoading(false)
        setEstadosPosibles(posibles)
      }
      fetchPosiblesEstados()
    }
  }, [])


  const {titulo, descripcion} = tarea ?? {titulo: '',descripcion:''}

  const deleteTarea = () => {
    if(tareaInicial){
      const {id, tablero_id} = tareaInicial
      fetchPrelloApi(`tableros/${tablero_id}/tareas/${id}`, 'DELETE')
      dispatch(crear_eliminar_tarea(tablero_id, id))
      onForceClose()
    }
  }

  return (
      <Modal isOpen={isOpen} onClose={() => onClose(tarea)}>
        <div className={styles.modalInnerContainer}>
          <div className={styles.leftContainer}>
            <input className={styles.titulo} value={titulo} onChange={ event => setTarea({...tarea, titulo: event.target.value})}/>
            <textarea className={styles.descripcionModal} value={descripcion} onChange={ event => setTarea({...tarea, descripcion: event.target.value})}/>
          </div>
          <div className={styles.rightContainer}>
            <div>
              <div className={styles.button} style={{backgroundColor: 'red'}} onClick={()=> deleteTarea()}><b>Eliminar tarea</b></div>
            </div>
            {!isLoading &&             
            <div>
              {estadosPosibles.map((estado, index) => 
                <div key={index} className={styles.button}><b>{estado.nombre}</b></div>
              )}
            </div>}
          </div>
        </div>
      </Modal>
  );
}
