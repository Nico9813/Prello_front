import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetchPrelloApi } from "../../hooks/useFetchPrelloApi";

function Shared() {
    const fetchPrelloApi = useFetchPrelloApi()
    const router = useRouter()

    useEffect(() => {
      const id = window.location.href.split('?id=').pop();
      (async () => {
        const tablero = await fetchPrelloApi(`tableros/shared/${id}`, 'POST', {})
        router.push(`/tablero/${tablero.id}`)
      })()
    }, [])

  return (
    <>
    </>
  );
}

export default Shared;
