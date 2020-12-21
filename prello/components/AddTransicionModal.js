import styles from "../styles/AddTransicionModal.module.css";
import { useState } from "react";
import Modal from './Modal'

export default function AddTransicionModal({isOpen, onClose, estados}) {

	const [idEstadoInicial, setIdEstadoInicial] = useState(estados[0].id)
	const [idEstadoFinal, setIdEstadoFinal] = useState(estados[0].id)

  	return (
      <Modal isOpen={isOpen} onClose={() => onClose(idEstadoInicial, idEstadoFinal)} height="20%" width="30%">
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
        </div>
      </Modal>
  );
}