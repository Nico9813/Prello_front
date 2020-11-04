import { useAuth0 } from "@auth0/auth0-react"

var prevAccessToken

export function useFetchPrelloApi(){

    const prelloAudience = `https://api-prello/v1`

    const { getAccessTokenSilently } = useAuth0()

    return async function fetchPrelloApi(path, method, body={}){

        const accessToken = prevAccessToken ?? await getAccessTokenSilently({
            audience: prelloAudience
        })
        
        prevAccessToken = accessToken
        
        const prelloBody = method != 'GET' ? { body: JSON.stringify(body)} : {}
        const prelloPath = `http://127.0.0.1:52207/${path}`

        try{
            const options = {
                method: method, 
                headers:{
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                ...prelloBody
            }

            const inicio = new Date().valueOf()
            const data = await fetch(prelloPath, options)
            const fin = new Date().valueOf()
            console.log(`fetch prello api: ${fin - inicio}ms`)
            return await data.json()
        }catch(e){
            console.log(e.message)
        }
    }
}