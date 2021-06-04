module.exports = [`
    type Query {
        user(id: ID!): User
        users: [User]
    }
    type Mutation {
        updateUserInfo(
            id: ID!,
            name: String, 
            city: String, 
            state: String
        ): User
    }
    type User {
        id: ID
        name: String
        city: String
        state: String
        followers: [User]
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
    }
`];
