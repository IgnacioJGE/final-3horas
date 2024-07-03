import axios from "npm:axios"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { GraphQLError } from 'graphql';
const env = await load();

const api_key = Deno.env.get("api_key") || env.api_key;

export async function validatePhone(phone: string) {

        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${phone}`, {
            headers: { 'X-Api-Key': api_key }
        })
        if (respuesta.data.is_valid == false) throw new GraphQLError("Numero incorrecto")
        if (respuesta.data.error) throw new GraphQLError("Formato incorrecto")
        return respuesta.data.country
 
}

export async function getCapital(pais: string) {

        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/country?name=${pais}`, {
            headers: { 'X-Api-Key': api_key }
        })
        if (respuesta.data.length == 0) throw new GraphQLError("Pais incorrecto")
        return respuesta.data[0].capital

}

export async function getlatitudelongitude(ciudad: string) {

        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/city?name=${ciudad}`, {
            headers: { 'X-Api-Key': api_key }
        })
        if (respuesta.data.length == 0) throw new GraphQLError("ciudad incorrecta")
        return ({ latitude: respuesta.data[0].latitude, longitude: respuesta.data[0].longitude })

}
export async function gethora(latitude: string, longitude: string) {

        const respuesta = await axios.get(`https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`, {
            headers: { 'X-Api-Key': api_key }
        })
        if (respuesta.data.error) throw new GraphQLError("Formato incorrecto")

        return (`${respuesta.data.hour}:${respuesta.data.minute}:${respuesta.data.second}`)

}