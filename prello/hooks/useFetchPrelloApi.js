import { useAuth0 } from "@auth0/auth0-react";

export async function useFetchPrelloApi() {
    const { getAccessTokenSilently } = useAuth0();
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://api-prello/v1`,
      });
      return async function(path, headers, body){
        const response = await fetch(
          path, 
          {
            headers: {
              ...headers, 
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        return await response.json()
      }
    } catch (e) {
      console.log(e.message);
    }
}
