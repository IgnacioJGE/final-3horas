import mongoose from "mongoose"
import { Contacto } from "../types.ts"



const Schema= mongoose.Schema

const schemaContacto= new Schema({
    Nombre:{type:String,requires:true},
    apellidos:{type:String,requires:true},
    phone:{type:String,requires:true,unique:true},
    pais:{type:String,requires:true},
    capital:{type:String,requires:true},
},
{timestamps:true})

export type tipocontaccto= mongoose.Document & Omit<Contacto, "hora" & "id"> & ({capital:string})

export const Modelocontacto= mongoose.model<tipocontaccto>("Contactos",schemaContacto)