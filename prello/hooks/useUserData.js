import { initializeStore } from "../data/store";
import { usePrelloApi } from "./usePrelloApi";

export async function useUserData() {
  const reduxStore = initializeStore();
  const { isFetched } = reduxStore.getState();

  if (!isFetched) {
    console.log("fetching data...")
    const { getPerfil } = usePrelloApi()
    getPerfil();
  }
  
  //TODO: Utilizar retorno para fallo de autentificacion y isLoading

  return reduxStore.getState();
}
