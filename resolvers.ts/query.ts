import {GraphQLError} from "graphql"
import { Contacto } from "../types.ts"
import { getCapital, getlatitudelongitude, validatePhone,gethora } from "../apigetters.ts"
import { Modelocontacto } from "../db/contactos.ts"
import { latlon } from "./mutation.ts"
export const Query={
    getContacts:async():Promise<Contacto[]>=>{
        const contactos= await Modelocontacto.find()
        if(!contactos) throw new GraphQLError("No hay contactos")
        
        const arraymostrar:Contacto[]=[]
        for (let index = 0; index < contactos.length; index++) {
            const latlon:latlon= await getlatitudelongitude(contactos[index].capital)
            const hora= await gethora(latlon.latitude,latlon.longitude)
            arraymostrar.push({
                id:contactos[index]._id,
                Nombre:contactos[index].Nombre,
                apellidos:contactos[index].apellidos,
                phone:contactos[index].phone,
                pais:contactos[index].pais,
                hora:hora
            })
            
        }
        return arraymostrar

    },
    getContac: async(_:unknown,
        args:{id:string}
    ):Promise<Contacto>=>{
        const contactomostrar= await Modelocontacto.findById(args.id)
        if(!contactomostrar)throw new GraphQLError(`No se encuentra contacto con la id:${args.id}`)
            const latlon:latlon= await getlatitudelongitude(contactomostrar.capital)
        const hora= await gethora(latlon.latitude,latlon.longitude)
        return ({   

            id:contactomostrar._id,
            Nombre:contactomostrar.Nombre,
            apellidos:contactomostrar.apellidos,
            phone:contactomostrar.phone,
            pais:contactomostrar.pais,
            hora:hora
      
    })
    }
}