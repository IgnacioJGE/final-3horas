import { GraphQLError } from "graphql"
import { Contacto } from "../types.ts"
import { getCapital, getlatitudelongitude, validatePhone, gethora } from "../apigetters.ts"
import { Modelocontacto } from "../db/contactos.ts"
import { graphql } from "graphql";
export type latlon = {
    longitude: string,
    latitude: string
}
export const Mutation = {
    addContact: async (_: unknown,
        args: { Nombre: string, apellidos: string, phone: string }
    ): Promise<Contacto> => {
        const ciudad = await validatePhone(args.phone)
        const capital = await getCapital(ciudad)
        const latlon: latlon = await getlatitudelongitude(capital)
        const hora = await gethora(latlon.latitude, latlon.longitude)
        const nuevocontacto = new Modelocontacto({
            Nombre: args.Nombre,
            apellidos: args.apellidos,
            phone: args.phone,
            pais: ciudad,
            capital: capital
        })
        await nuevocontacto.save()
        return ({
            id: nuevocontacto._id,
            Nombre: args.Nombre,
            apellidos: args.apellidos,
            phone: args.phone,
            pais: ciudad,
            hora: hora
        })
    },
    deleteContact: async (_: unknown,
        args: { id: string }
    ): Promise<boolean> => {
        const eliminado = await Modelocontacto.findByIdAndDelete(args.id)
        if (!eliminado) return false
        return true
    },
    updateContact: async (_: unknown,
        args: { Nombre: string, apellidos: string, phone: string, id: string }
    ): Promise<Contacto> => {
        if (!args.Nombre && !args.phone && !args.apellidos) throw new GraphQLError("Se necesita al meno sun campo para actualizar")
        const actual = await Modelocontacto.findById(args.id);
        if (!actual) throw new GraphQLError(`No se encuentra contacto con la id:${args.id}`)

        if (args.Nombre == actual.Nombre || args.phone == actual.phone) throw new GraphQLError("Nombre o telefono son iguales que el actual")
        if (!args.phone) {
            if (!args.apellidos) {
                await Modelocontacto.findByIdAndUpdate(args.id, {
                    Nombre: args.Nombre
                })
                const latlon: latlon = await getlatitudelongitude(actual.capital)
                const hora = await gethora(latlon.latitude, latlon.longitude)
                return ({
                    id: actual._id,
                    Nombre: args.Nombre,
                    apellidos: actual.apellidos,
                    phone: actual.phone,
                    pais: actual.pais,
                    hora: hora
                })
            }
            if (!args.Nombre) {
                await Modelocontacto.findByIdAndUpdate(args.id, {
                    apellidos: args.apellidos
                })
                const latlon: latlon = await getlatitudelongitude(actual.capital)
                const hora = await gethora(latlon.latitude, latlon.longitude)
                return ({
                    id: actual._id,
                    Nombre: actual.Nombre,
                    apellidos: args.apellidos,
                    phone: actual.phone,
                    pais: actual.pais,
                    hora: hora
                })
            }

            await Modelocontacto.findByIdAndUpdate(args.id, {
                Nombre: args.Nombre,
                apellidos: args.apellidos
            })
            const latlon: latlon = await getlatitudelongitude(actual.capital)
            const hora = await gethora(latlon.latitude, latlon.longitude)
            return ({
                id: actual._id,
                Nombre: args.Nombre,
                apellidos: args.apellidos,
                phone: actual.phone,
                pais: actual.pais,
                hora: hora
            })
        }
        if (!args.Nombre) {
            if (!args.apellidos) {
                const ciudad = await validatePhone(args.phone)
                const capital = await getCapital(ciudad)
                const latlon: latlon = await getlatitudelongitude(capital)
                const hora = await gethora(latlon.latitude, latlon.longitude)

                await Modelocontacto.findByIdAndUpdate(args.id, {
                    phone: args.phone,
                    pais: ciudad,
                    capital: capital
                })
                return ({
                    id: actual._id,
                    Nombre: actual.Nombre,
                    apellidos: actual.apellidos,
                    phone: args.phone,
                    pais: ciudad,
                    hora: hora
                })
            }
            const ciudad = await validatePhone(args.phone)
            const capital = await getCapital(ciudad)
            const latlon: latlon = await getlatitudelongitude(capital)
            const hora = await gethora(latlon.latitude, latlon.longitude)

            await Modelocontacto.findByIdAndUpdate(args.id, {
                apellidos: args.apellidos,
                phone: args.phone,
                pais: ciudad,
                capital: capital
            })
            return ({
                id: actual._id,
                Nombre: actual.Nombre,
                apellidos: args.apellidos,
                phone: args.phone,
                pais: ciudad,
                hora: hora
            })

        }
        if(!args.apellidos){
            const ciudad = await validatePhone(args.phone)
            const capital = await getCapital(ciudad)
            const latlon: latlon = await getlatitudelongitude(capital)
            const hora = await gethora(latlon.latitude, latlon.longitude)
    
            await Modelocontacto.findByIdAndUpdate(args.id, {
                Nombre: args.Nombre,
                phone: args.phone,
                pais: ciudad,
                capital: capital
            })
            return ({
                id: actual._id,
                Nombre: args.Nombre,
                apellidos: actual.apellidos,
                phone: args.phone,
                pais: ciudad,
                hora: hora
            })
    
        }

        const ciudad = await validatePhone(args.phone)
        const capital = await getCapital(ciudad)
        const latlon: latlon = await getlatitudelongitude(capital)
        const hora = await gethora(latlon.latitude, latlon.longitude)

        await Modelocontacto.findByIdAndUpdate(args.id, {
            Nombre: args.Nombre,
            apellidos: args.apellidos,
            phone: args.phone,
            pais: ciudad,
            capital: capital
        })
        return ({
            id: actual._id,
            Nombre: args.Nombre,
            apellidos: args.apellidos,
            phone: args.phone,
            pais: ciudad,
            hora: hora
        })



    }
}