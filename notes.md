# GraphQL Brown Bag

## Introduction

Hey all. So I've been a software developer for Leidos/Lockheed since 2004 with a primary focus on UI web development, but over the past few years I've been focusing full stack development. I've have had plenty of experience with creating APIs using the RESTful design and over the past year or 2, I've been dabbling with GraphQL with various projects within the LiNC.

So I wouldn't consider myself an expert in GraphQL but I have been enjoying it so far. But because of my limited experience, I will add a disclaimer, that I am not an expert and don't know any of the problems or solutions when it comes to using GraphQL at scale.

## What is GraphQL?

At its core, it is a defined schema that acts like a contract such that a client can use for querying data and that server can use in order to present the data to the client.

GraphQL provides a description of the data in your API and gives clients the power to ask for exactly what they need. This in turn makes it easier to evolve APIs over time, and enables powerful developer tools. More on this later.

## GraphQL History

Created by Facebook in 2012, GraphQL was used internally for their mobile applications in order to reduce network usage due to slow mobile networks.

GraphQL specifications and implementation in JavaScript were open-sourced in 2015. And now there are many major programming languages that support it, including Python, Java, C#, and more.

## The Good

So here are a few good things that come from using GraphQL.

- You only need to make 1 network call to bring back your initial data
- Bring back only the data we care about. No more & no less.
- Because of the defined schema, there is a level of documentation built right in. No need for extra documentation about how the data is formatted or what queries are available.
- Validation and type checking are available right out-of-the-box. So you don't need to double check if a string is being sent in instead of a number
- GraphQL allows front end and back end developers to work independently since there is an agreed upon data schema. I can't count the number of times where I had to go to a back end developer and ask for modifications or request an additional service so I can get more or less data.

## The Bad

With good things there comes bad things and here are a few of the cons that come with using GraphQL.

- Since all requests use the same single endpoint, web caching becomes much harder since you can't user normal web caching that is based on URL alone.
- Performance issues can start to creep in with complex queries that involve nested fields and resolvers. I'll give a demo of this later to hopefully provide a better picture.
- With GraphQL, it's harder to implement a shared nothing architecture. An example of this is can be seen with RESTful service since there are different endpoints that use different URLs. With this type of architecture, it's easy to set things up so that we can deploy multiple independent microservices and hook things together via url routing using numerous options out there. For GraphQL, the server will need to handle that complexity and most likely be developed in house in order to fuse multiple data sources into the defined schema.

## REST Example

For those like me who like visual examples, here is REST example that shows client server interactions that are needed in order to request some data. What the client is trying to do is get information about a user including the posts that they have written and a list of followers.

By using a standard REST protocol, the client will need to make 3 separate requests. One for user information, another for a list of posts, and a third to get a list of followers. Notice that we don't have any control on the specific data fields that we want. So if we didn't need the user's birthday, that is wasted data coming back from the server.

## GraphQL Example

Here is an example of a GraphQL interaction between a client and server. The client only needs to make one call to the GraphQL endpoint and only request the data that it needs such as only the user's name, post titles, and follower's names.

## Is it over for REST? Not yet.

- It is an industry standard that has been tried and tested
- It is easier to implement a shared nothing architecture with individual microservices which can keep code bases small and hopefully manageable
- REST supports various data formats (XML, JSON, HTML, plain text, etc.) as a response, where as GraphQL only supports the JSON data format
- Easier to set up for simple applications since you don't have to define a schema ahead of time and code up resolvers.

## Our Sample User Data

Before we dive into some code, I want to go over the sample data that I will be using to mimic data stored in a document based database.

I'm going to pretend that our data is stored in 2 collections. Users & Posts.

Within the user collection we have basic user information such as id, name, city, state, and a list of followers that consists of other user's ids.

## Our Sample Post Data

In the posts collection, we have the post id, title and a user id labeled as the author id.

## GraphQL Building Blocks

GraphQL consists of 3 basic building blocks.

- A schema that act as a contract for client-server communication
- Queries or Mutations which defines what Clients can send in order to specify a request for data that they need or a way to modify data
- And last resolvers. Resolvers are functions which specifies how a field gets populated in the back end. Every field has a resolver function.

## Schema

Here is an example schema that we will be using in our demo.

We have sections for

- queries
- mutations
- custom data types. Custom data types represent the data model that is being used within our application.

##  Default Supported Types

Schemas support basic data types. The data types are integers, floats, string, boolean, & ID which is stored as a string but represents a unique identifier.

## Queries

Here is code that a client can send that consists of 2 queries.

One for getting a specific user and another for get a list of users. With each query we can specify what data we want back from the server.

## Mutations

Here is code for a mutation where we want to update the city field for user with id `0` and from the result we want to get back the user's id, city, and state

## Custom Data Types

Here are the custom data types or models we defined in our schema. One represents a user and the other represents a post.

With the user data model, we have specified an ID, name, city, state, list of Users we label as followers, and a list of posts.

With the post data model, we have an ID and title.

## Resolvers

A resolver is a function that's responsible for populating data for a single field in your schema. Resolver functions are passed with parameters that represent 

- parent object
- arguments
- execution context

If you remember from a few slides back, every field needs to have a resolver, but as you will see here there isn't a resolver function for every data field we have defined in a schema. That's because if you don't specify a resolver for a specific field, then GraphQL will fall back to a default resolver which does the following.

1. Returns a property from the object that we are returning. So with the user's name, we don't have to setup a custom resolver since the name is part of the user object that we store in our database.
2. Calls a function on the object with the relevant field name

## Resolver Example

Here we have our query resolvers which are responsible for returning data for each query. Here we have resolvers for both user and users query. In the user resolver, we find the user object that matches the ID being passed. In the resolver for users, we return all the users.

Mutation resolvers are just like query resolvers, but for mutations where we want to modify data. In this resolver, we want to update a user's information. We take in a user id, name, city, and/or state and update the user's information if that new information was given.

The last type of resolvers are at the field level for our custom data types. These are for fields that we need to obtain more data since the base object doesn't contain them. In the User schema, we don't need a custom resolver for a user's name since that's supplied from the user object. But we do need a resolver for the user's followers and posts. This is the logic that where we tie data from different data sources in order to comply with the defined schema. For followers, we convert the list of ids to a list of users. For posts, we look up a list of posts that belong to the user. These resolvers only get called if the client requests for this data.

## Demo Time

### GraphiQL Tool

For this demo, i'll be using a tool called GraphiQL which is like an IDE for querying a graphql endpoint. It's a powerful tool that is very easy to setup. All you need to do is point it to a graphql endpoint and then it will download the schema and present it to you in an easy to use interface which provides a schema explorer and text autocomplete helpers. This is what I meant earlier by GraphQL having a level of built in documentation that is ready to used based on the schema.

### Query

Here is a query where we will get all the data from a user which will use the resolvers that we have defined for followers and posts
```
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

Now here's a query where we only get data available from the user object that's stored in the database. From the logs we can see that we don't call the Post resolver or the followers resolver since there is no need for that data.

```
query {
    user(id:"0") {
        id
        name
        city
        state
    }
}
```

### Mutations

Here is an example of a mutation where we will update August's city and state from Underhill, VT to Philadelphia, PA.

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

Now we'll touch on some of the performance issues that we can run into that is related with field level resolvers.

In this query we get a list of users and their followers. For every user we get back we need to look up, we also need to call the resolver for followers in order to find the name of each follower. Our resolver is a simple function which gets called for every user in order to get a list users that correspond to the list of ids that is stored. If that database lookup is a slow function then this can take a while.

```
query {
    users {
        name
        followers {
            name
        }
    }
}
```

Now let's get a little weird because we can with how our schema is setup. For each user's followers, let's look up that follower's follower. We can do this since a follower is just a User data type which has a field called followers. By doing this, we make a lot of duplicate calls to the database in order to retrieve a user object. If we wanted to optimize this for performance, it would be best to set up some sort of caching mechanism on the database or within our code.

```
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

## Conclusion

I hope this presentation was able to shed some light on what GraphQL and why it came to be. I know that I have enjoyed using it with various IRAD projects within the LiNC and wanted to share my thoughts with you. Thanks.

## Resources

- [REST today](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#rest-today)
- [Problems with REST](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#problems-with-rest)
- https://hackernoon.com/3-minute-introduction-to-graphql-2c4e28ed528
- https://thenewstack.io/introduction-to-graphql/

