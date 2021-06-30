module.exports = [`
    type Query {
        # A query to get a specific user
        user(id: ID!): User
        # A query to get a list of all users
        users: [User]
    }
    type Mutation {
        # A mutation to update a user's information
        updateUserInfo(
            id: ID!
            name: String
            city: String
            state: String
        ): User
    }
    # A data model representing a user
    type User {
        id: ID
        name: String
        city: String
        state: String
        followers: [User]
        posts: [Post]
    }
    # A data model representing a post
    type Post {
        id: ID
        title: String
    }
`];
