import { initializeStore } from "../data/store";
import {
  crear_agregar_roles,
  crear_agregar_tableros,
  crear_set_fet_data,
} from "../data/acciones";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";

export async function useUserData() {
  const reduxStore = initializeStore();
  const { isFetched } = reduxStore.getState();

  if (!isFetched) {
    const { dispatch } = reduxStore;
    const fetchPrelloApi = useFetchPrelloApi()
    dispatch(crear_set_fet_data(true));
    
    const { tableros, roles } = await fetchPrelloApi('perfil', 'GET')
    dispatch(crear_agregar_tableros(tableros));
    dispatch(crear_agregar_roles(roles));
  }

  //TODO: Utilizar retorno para fallo de autentificacion y isLoading

  return reduxStore.getState();
}
