import styles from "../styles/AddTransicionModal.module.css";
import { useState } from "react";
import Modal from './Modal'

export default function AddTransicionModal({isOpen, onClose, onSubmit, estados}) {

	const [idEstadoInicial, setIdEstadoInicial] = useState(estados[0].id)
	const [idEstadoFinal, setIdEstadoFinal] = useState(estados[0].id)

  	return (
      <Modal isOpen={isOpen} onClose={() => onClose()} height="20%" width="30%">
        <div className={styles.container}>
			<p>Nueva transicion</p>
			<label>Estado inicial</label>
			<select onChange={evt => setIdEstadoInicial(evt.target[evt.target.selectedIndex].id)}>
				{estados.map( (estado, index) => <option key={index} id={estado.id}>{estado.nombre}</option>)}
			</select>
			<label>Estado inicial</label>
			<select onChange={evt => setIdEstadoFinal(evt.target[evt.target.selectedIndex].id)}>
				{estados.map( (estado, index) => <option key={index} id={estado.id}>{estado.nombre}</option>)}
			</select>
			<button onClick={() => {onSubmit(idEstadoInicial, idEstadoFinal); onClose()}}>Agregar transicion</button>
        </div>
      </Modal>
  );
}