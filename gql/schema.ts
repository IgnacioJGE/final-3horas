export const typeDefs = `#graphql
type Contacto{
    id:ID!
    Nombre:String!
    apellidos:String!
    phone:String!
    pais:String!
    hora:String!
}
type Query{
    getContac(id:ID!):Contacto
    getContacts:[Contacto!]!
}
type Mutation{
    addContact(Nombre:String!,apellidos:String!,phone:String!):Contacto!
    deleteContact(id:ID!):Boolean!
    updateContact(ud:ID!,Nombre:String,phone:String):Contacto!
}
`;
