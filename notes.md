# GraphQL Brown Bag

## Introduction

Hey all. So I've been a software developer for Leidos/Lockheed since 2004 with a primary focus on UI web development, but over the past few years I've been focusing on full stack development. I've have had plenty of experience with creating APIs using the RESTful pattern. And over the past year or 2, I've been dabbling with GraphQL with various projects within the LiNC.

So I wouldn't consider myself an expert in GraphQL but I have been enjoying it so far. And because of my limited experience, I will add a disclaimer, that I am not an expert and I don't know many of the problems or solutions when it comes to using GraphQL at scale.

## What is GraphQL?

At its core, it is a defined schema that acts like a contract such that a client can use for querying data and that server can use in order to present the data to the client.

GraphQL provides a description of the data in your API and gives clients the power to ask for exactly what they need. This in turn can help make it easier to evolve APIs over time, and enable powerful developer tools which I will demo later.

## GraphQL History

GraphQL was created by Facebook in 2012 and was used internally for their mobile applications in order to reduce network traffice due to slow mobile networks at that time.

In 2015, Facebook open-source their javascript implementation of GraphQL. And since then, there are many major programming languages that now support it, including Python, Java, C#, and more.

## The Good

So here are a few good things that come from using GraphQL.

- You only need to make 1 network call to bring back your initial data which means less round trips to the server.
- Bring back only the data we care about. No more & no less which means less data to transfer.
- Because of the defined schema, there is a level of documentation built right in. No need for extra documentation about how the data is formatted or what queries are available to the client
- Validation and type checking are available right out-of-the-box. So you don't need to double check if you're getting a string value when you're expecting a number value.
- GraphQL allows front end and back end developers to work independently because there is an agreed upon data schema. I personally can't count the number of times where I had to go to a back end developer and ask for modifications or request an additional service so I can the data I need.

## The Bad

With all good things there also comes bad things and here are a few of the cons that come with using GraphQL.

- Since all requests use the same single endpoint, web caching becomes much harder to implement since you can't use normal web caching techniques that is based on URL alone.
- Performance issues can start to creep in with complex queries that involve nested fields and resolvers. I'll give a demo of this later to hopefully provide a better picture of this.
- Also with GraphQL, it's harder to implement a shared nothing architecture. An example of this can be seen with RESTful APIs. Since there are different endpoints that use different URLs, it's easy to set things up so that we can deploy multiple independent microservices and hook things together via a proxy server like NGINX or Apache. Since GraphQL uses a single endpoint, the server needs to handle the complexity between different services and data sources in order to fuse them into the defined schema.

## REST Example

For those like me who like visual examples, here is REST example that shows client server interactions that are needed in order to request some data. What the client is trying to do here is get information about a user including the posts that they have written and a list of followers.

By using a standard REST protocol, the client will need to make 3 separate requests. One for user information, another for a list of posts, and a third to get a list of followers. Notice that we don't have any control on the specific data fields that we want. So if we didn't need the user's birthday, that is wasted data coming back from the server.

## GraphQL Example

Here is an example of a GraphQL interaction between a client and server. The client only needs to make one call to the GraphQL endpoint and only request the data that it needs. Here we are only requesting the user's name, post titles, and follower's names.

## Is it over for REST? Not yet.

- REST is an industry standard that has been tried and tested
- It is easier to implement a shared nothing architecture with individual microservices which can keep code bases small and hopefully more manageable
- REST also supports various data formats as a server response, where as GraphQL only supports semding back JSON
- REST is also easier to set up for simple applications since you don't have to define a schema ahead of time and code up the corresponding resolvers

## Our Sample User Data

Before we dive into some code, I want to go over the sample data that I will be using to mimic data stored in our database.

I'm going to pretend that our data is stored in 2 collections. Users & Posts.

Here within the user collection we have basic user information such as id, name, city, state, and a list of followers which consists of other user's ids.

## Our Sample Post Data

In the posts collection, each post has an id, title, and a user id labeled as authorId.

## GraphQL Building Blocks

GraphQL consists of 3 basic building blocks.

- A schema that act as a contract for client-server communication
- Queries or Mutations which defines what data clients can request or methods to use to modify data
- And last resolvers. Resolvers are functions which specifies how a data field gets populated in the back end. Every field has a resolver function.

## Schema

Here is an example schema that we will be using in our demo.

We have sections for

- queries which define what data a client can request
- mutations which define what methods are available to modify data
- custom data types. Custom data types represent the data model that is being used within our application.

##  Default Supported Types

Schemas support basic data types. The data types are integers, floats, string, boolean, & ID which is stored as a string but represents a unique identifier.

## Queries

Here is a request that a client can send that consists of 2 queries.

One for getting a specific user and another for get a list of users. With each query we can specify what data we want back from the server.

## Mutations

Here is request for a mutation where we want to update the city field for user with an id of `0` and from the response we want to get back the user's id, city, and state

## Custom Data Types

Here are the custom data types or models that are defined in the schema. One represents a user and the other represents a post.

With the user data model, we have specified an ID, name, city, state, list of followers with a data type of User, and a list of posts with the Post data type.

With the post data model, we have an ID and a title.

## Resolvers

A resolver is a function that's responsible for populating data for a single field in your schema. Resolver functions are passed with parameters that represent 

- parent object
- arguments
- execution context

If you remember from a few slides back, every field needs to have a resolver, but as you will see here in the example code there isn't a resolver function for every data field we have defined in the schema. That's because if you don't specify a resolver, then GraphQL will fall back to a default resolver which does the following.

1. Returns a property from the object that we are returning. So with the user's name, we don't have to setup a custom resolver since the name is part of the user object that we store in our database.
2. Calls a function on the object with the relevant field name

## Resolver Example

This is the example resolver being used in the demo. We have our query resolvers which are responsible for returning data for each query. In the user resolver, we find the user object that matches the ID being passed in and return the user object. In the resolver for users, we just return all the users.

Mutation resolvers are just like query resolvers, but mutations are for modifying data. In this resolver, we want to update a user's information. We take in a user id, name, city, and/or state and update the user's information if that new information was given, and then we return the updated user.

The last type of resolvers are at the field level for our custom data types. These are for fields that we need to obtain more data since the base object doesn't contain them. In the User schema, we don't need a custom resolver for a user's name since that's supplied from the user object. But we do need a resolver for the user's followers and posts. This is the logic where we tie data from different data sources in order to comply with the defined schema. For followers, we convert the list of ids to a list of users. For posts, we look up a list of posts that belong to the user. These resolvers only get called if the client requests for this specific data.

## Demo Time

Here are a few things that I am going to demo.

A developer tool that can be quickly added for use, sample queries, mutations, and potential performance issues.

### GraphiQL Tool

This tool called GraphiQL which is like an IDE for querying a graphql endpoint. It's a powerful tool that is very easy to setup. All you need to do is install the library into your code and point it to a graphql endpoint. It will then have access to the schema and present it to you in an easy to use interface.

On the right we have a schema explorer where you can view the schema and how it's all layed out. In the query box, we get helpful auto complete suggestions.

### Query

Here is a query where we will get all the data from a user which will use the resolvers that we have defined for followers and posts. If we take a look at the logs, you can see that we call the user resolver, along with the resolver to find the user's followers and the post resolver.
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

In this query we get a list of users and their followers. For every user we get back we need to look up their followers which in turn calls the corresponding resolver. Our resolver is a simple function which gets a list users that correspond to the list of ids that is stored on the user object. If that database lookup were to be a slow function then this can take a while since we're doing 3 separate lookups.

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

Now let's get a little weird here because we can with the way that the schema is setup. For each user's followers, let's look up that follower's follower. We can do this since a follower is just a User data type which has a field called followers. By executing this query, we make a lot of duplicate calls to the database in order to retrieve a user object. If we wanted to optimize this for performance, we could set up some sort of caching mechanism on the database or within our code so we don't take a performance hit with each redundant query.

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

I hope this presentation was able to shed some light on what GraphQL is and why it came to be. I know that I have enjoyed using it with various IRAD projects within the LiNC and just wanted to share my thoughts with you. Thanks.

## Resources

- [REST today](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#rest-today)
- [Problems with REST](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#problems-with-rest)
- https://hackernoon.com/3-minute-introduction-to-graphql-2c4e28ed528
- https://thenewstack.io/introduction-to-graphql/

