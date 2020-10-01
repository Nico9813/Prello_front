import { initializeStore } from "../data/store";
import { crear_agregar_tableros, crear_set_fet_data } from "../data/acciones";

export async function useUserData() {
  const reduxStore = initializeStore();
  const { isFetched } = reduxStore.getState();

  if (!isFetched) {
    try {
      const { dispatch } = reduxStore;
      const res = await fetch("http://127.0.0.1:5000/tableros");
      const userData = await res.json();
      dispatch(crear_set_fet_data(true));
      dispatch(crear_agregar_tableros(userData));
    } catch {
      return reduxStore.getState();
    }
  }

  return reduxStore.getState();
}
