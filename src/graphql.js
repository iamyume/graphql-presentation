const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const typeDefs = require('./typedefs');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = async (req, res, next) => {
    const {
        method,
    } = req;

    switch (method) {
        case 'GET':
        case 'POST':
            await graphqlHTTP({
                schema,
                graphiql: true,
                context: {}
            })(req, res, next);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};
