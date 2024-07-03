import {GraphQLError} from "graphql"
import { Contacto } from "../types.ts"
import { getCapital, getlatitudelongitude, validatePhone,gethora } from "../apigetters.ts"
import { Modelocontacto } from "../db/contactos.ts"
type latlon={
    longitude:string,
    latitude:string
}
export const Mutation={
    addContact: async(_:unknown,
        args:{Nombre:string,apellidos:string,phone:string}
    ):Promise<Contacto>=>{
        const ciudad= await validatePhone(args.phone)
        const capital= await getCapital(ciudad)
        const latlon:latlon= await getlatitudelongitude(capital)
        const hora= await gethora(latlon.latitude,latlon.longitude)
        const nuevocontacto= new Modelocontacto({
            Nombre:args.Nombre,
            apellidos:args.apellidos,
            phone:args.phone,
            pais:ciudad,
            capital:capital
        })
        await nuevocontacto.save()
        return({
            id:nuevocontacto._id,
            Nombre:args.Nombre,
            apellidos:args.apellidos,
            phone:args.phone,
            pais:ciudad,
            hora:hora
        })
    },
    deleteContact: async(_:unknown,
        args:{id:string}
    ):Promise<boolean>=>{
        const eliminado= await Modelocontacto.findByIdAndDelete(args.id)
        if(!eliminado)return false
        return true
    }

}