let { users, posts } = require('./data');

module.exports = {
    Query: {
        user: (root, args, context) => {
            const { id } = args;
            console.log(`looking up ${users[id].name}`)
            return users[id];
        },
        users: (root, args, context) => {
            console.log(`looking up users`)
            return users;
        },
    },
    Mutation: {
        updateUserInfo: async (root, args, context) => {
            let { id, name, city, state } = args;
            console.log(`updating ${users[id].name}`);

            // updating attributes if a value was given
            if (name) {
                users[id].name = name;
            }
            if (city) {
                users[id].city = city;
            }
            if (state) {
                users[id].state = state;
            }
            return users[id];
        },
    },
    User: {
        followers: async (parent, args, context, info) => {
            let { id } = parent;
            console.log(`looking up followers of ${users[id].name}`);

            // go thru each friend id and get the user object
            return users[id].followers.map(o => {
                console.log(`user lookup for id ${o}`);
                return users[o];
            });
        },
        posts: async (parent, args, context, info) => {
            let { id } = parent;
            console.log(`looking up posts of ${users[id].name}`);

            // go thru each friend id and get the user object
            return posts.filter(o => {
                return o.authorId == id;
            });
        }
    }
};