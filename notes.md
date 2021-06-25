# GraphQL Brown Bag

## Introduction

I wouldn't consider myself an expert in GraphQL but have been using it in some projects within LiNC and am enjoying it so far. But as a caveat, I don't know any of the troubles when it comes to using GraphQL at scale though.

## What is GraphQL?

GraphQL at its core is a language for querying data and specifies to the API how to present the data to the client. 

GraphQL provides a description of the data in your API, gives clients the power to ask for exactly what they need. This in turn makes it easier to evolve APIs over time, and enables powerful developer tools.

## GraphQL History

Created by Facebook in 2012, GraphQL was used internally for their mobile applications in order to reduce network usage due to slow mobile networks.

Since GraphQL specifications and reference implementation in JavaScript were open-sourced in 2015, major programming languages now support it, including Python, Java, C#, Node.js, and more.

## The Good

- Make only 1 network call to bring back initial data
- Bring back only the data we care about. No more & no less.
- Some level of documentation built in (data model & available queries)
- Validation and type checking out-of-the-box

## The Bad

- Web caching complexity since all requests use the same endpoint. Hard to cache based on URL alone.
- Performance issues with complex queries especially with nested fields and resolvers.
- Diminishes shared nothing architecture. With a REST endpoint using different URLs, it's easy to point to different microservices via routing. With GraphQL, the server will need to handle that complexity.

## Why Not Rest

- REST has a bunch of endpoints which return static data structures and relies on producing good documentation.
- REST APIs frequently under or over fetch data which leads to additional calls or extra data transfer
- GraphQL allows front end and back end developers can work independently since there is an agreed upon data schema.

## REST Example

To help further explain the differences, we will show client server interactions that are needed to request some data where we want data for a specific user including a list of their posts and followers.

- 3 server calls. User, Post, Followers.
- Overfetching data if you don't need them

## GraphQL Example

- 1 server call
- Only receive the data that you request.

## Is it over for REST? Not yet.

- Industry standard. Tried and tested
- Easier to implement a shared nothing architecture with individual microservices
- Supports various data formats (XML, JSON, HTML, plain text, etc.)
- Easier to set up for simple applications

## Our Sample User Data

Within the context of this presentation we're going to pretend that our data is stored in 2 collections. Users & Posts.

Within the user collection we have basic user information such as id, name, city, state, and a list of followers that consists of other user's ids.

## Our Sample Post Data

In the posts collection, we have the post id, title and a user id labeled as the author id.

## GraphQL Building Blocks

- *Schema*: The contract for client-server communication
- *Queries or Mutations*: Clients send these to specify a request for the data they need or to modify data
- *Resolvers*: Every field has a resolver function, which specifies how that field is connected to the back end and fetches data for that field

## Schema

Here is an example schema that we will be using in our demo.

We have sections for

- queries
- mutations
- custom data types

##  Default Supported Types

The basic data types that graphql supports out of the box are integers, floats, string, boolean, & ID which is stored as a string but represents a unique identifier.

## Queries

Here we have defined 2 queries.

One for getting a specific user and another for get a list of users. With each query we can specify what data we want back from the server.

## Mutations

We also have 1 simple mutation defined that will update a user's info and get back whatever data we specify.

## Custom Data Types

Here are the custom data types or models we defined in our schema. One represents a user and the other represents a post.

With the user, we have specified an ID, name, city, state, list of Users we label as followers, and a list of posts.

With the post, we have an ID and title.

## Resolvers

A resolver is a function that's responsible for populating data for a single field in your schema. Resolver functions are passed with parameters that represent 

- parent object
- arguments
- execution context

If you don't specify a resolver for a specific field, then GraphQL will fall back to a default resolver which does the following.

1. Returns a property from the object
2. Calls a function on the object with the relevant field name

Here we have our query resolvers which are responsible for returning data for each query. Here we have resolvers for both user and users query. In the user resolver, we find the user object that matches the ID being passed. In the resolver for users, we return all the users.

Mutation resolvers are just like query resolvers, but for mutations where we want to modify data. In this resolver, we want to update a user's information. We take in a user id, name, city, and/or state and update the user's information.

The last type of resolvers are at the field level for our custom data types. These are for fields that we need to obtain more data since the base object doesn't contain them. In the User schema, we need a resolver for followers and posts.

## Demo Time

### Query

```
query {
    users {
        id
        name
        city
        state
        followers {
          	id
            name
        }
      	posts {
          id
          title
        }
    }
}

query {
    user(id:"0") {
        id
        name
        city
        state
        followers {
          	id
            name
        }
      	posts {
          id
          title
        }
    }
}
```

### Mutations

```
mutation {
  updateUserInfo(id:"0", city:"Philadelphia", state:"PA") {
    id
    name
    city
    state
  }
}
```

### Nested Data Caution

```
query {
    users {
        name
        followers {
            name
        }
    }
}

query {
    users {
        name
        followers {
            name
            followers {
                name
            }
        }
    }
}
```

So here we will see where we can get into performance issues especially with field level resolvers. In this case when we get a list of users and their followers, we need to perform a user lookup of each follower. So in the case of our data, for the user "August" we have to do 2 user lookups since they have 2 followers. For Bailey & Cameron, we have to perform a single user lookup since they each have 1 follower. So in this case we need to do 4 user lookups.

Now let's get a little weird and a little Inceptiony because we can with how our schema is setup. For each user's followers, let's look up that follower's follower. Since a follower is just a User data type, we can look up a follower's follower. If a client did this, then this would cause even more data lookups as you can see here.\

## Resources

- [REST today](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#rest-today)
- [Problems with REST](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#problems-with-rest)
- https://hackernoon.com/3-minute-introduction-to-graphql-2c4e28ed528
- https://thenewstack.io/introduction-to-graphql/

