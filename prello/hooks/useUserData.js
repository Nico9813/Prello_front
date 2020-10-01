import { initializeStore } from "../data/store";
import {
  crear_agregar_roles,
  crear_agregar_tableros,
  crear_set_fet_data,
} from "../data/acciones";
import { useAuth0 } from "@auth0/auth0-react";

export async function useUserData() {
  const reduxStore = initializeStore();
  const { isFetched } = reduxStore.getState();

  if (!isFetched) {
    const { dispatch } = reduxStore;
    dispatch(crear_set_fet_data(true));
    const { getAccessTokenSilently } = useAuth0();
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://api-prello/v1`,
      });

      const metadataResponse = await fetch(`http://127.0.0.1:56193/perfil`, {
        headers: {
          contentType: "application/json",
          method: "GET",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { tableros, roles } = await metadataResponse.json();
      dispatch(crear_agregar_tableros(tableros));
      dispatch(crear_agregar_roles(roles));
    } catch (e) {
      console.log(e.message);
      return reduxStore.getState();
    }
  }

  //TODO: Utilizar retorno para fallo de autentificacion y isLoading

  return reduxStore.getState();
}
