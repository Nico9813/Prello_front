import { useRouter } from "next/router";
import { useEffect } from "react";
import { usePrelloApi } from "../../hooks/usePrelloApi";

function Shared() {
    const { joinTablero } = usePrelloApi()
    const router = useRouter()

    useEffect(() => {
      const id = window.location.href.split('?id=').pop();
      (async () => {
        const tablero = joinTablero(id)
        router.push(`/tablero/${tablero.id}`)
      })()
    }, [])

  return (
    <>
    </>
  );
}

export default Shared;
