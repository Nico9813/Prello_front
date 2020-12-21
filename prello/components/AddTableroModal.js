import { useState } from "react";
import Modal from './Modal'

export default function AddTableroModal({isOpen, onClose, onSubmit}) {

    const [nombre, setNombre] = useState('')

  	return (
      <Modal isOpen={isOpen} onClose={onClose} height="7%" width="17%">
        <div>
            <input onChange={evt => setNombre(evt.target.value)}></input>
            <button onClick={() => onSubmit(nombre)}>Crear Tablero</button>
        </div>
      </Modal>
  );
}