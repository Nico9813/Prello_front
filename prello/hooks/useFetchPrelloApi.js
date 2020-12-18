import { useAuth0 } from "@auth0/auth0-react"
import Axios from "axios"
import https from "https"

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
        const prelloPath = `${process.env.API}/${path}`

        try{
            const options = {
                url: prelloPath,
                method, 
                headers:{
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${accessToken}`
                },
                ...prelloBody
            }

            const inicio = new Date().valueOf()
            const agente = https.Agent({
                rejectUnauthorized: false
            })
            const data = await Axios(options, { httpsAgent: agente})
            const fin = new Date().valueOf()
            console.log(`fetch prello api: ${fin - inicio}ms`)
            return await data.data
        }catch(e){
            console.log(e.message)
        }
    }
}