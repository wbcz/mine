
import {
    GraphQLString,
    GraphQLObjectType
} from 'graphql'

const HelloWorldType = new GraphQLObjectType({
    name: 'HelloWorldType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return 'world';
            },
        }
    }
})

export default HelloWorldType