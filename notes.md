# GraphQL Brown Bag

## Introduction

I wouldn't consider myself an expert in GraphQL but have been using it in some projects within LiNC and am enjoying it so far. I do not know any of the troubles of using GraphQL at scale though.

## What is GraphQL?

At its core, GraphQL is a language for querying databases from client-side applications. On the backend, GraphQL specifies to the API how to present the data to the client. GraphQL redefines developers’ work with APIs offering more flexibility and speed to market; it improves client-server interactions by enabling the former to make precise data requests and obtain no more and no less, but exactly what they need.

Initially created by Facebook in 2012, GraphQL was used internally for their mobile applications to reduce network usage by means of its specific data-fetching capabilities. Since GraphQL specifications and reference implementation in JavaScript were open-sourced in 2015, major programming languages now support it, including Python, Java, C#, Node.js, and more. The GraphQL ecosystem is expanding with libraries and powerful tools like Apollo, GraphiQL, and GraphQL Explorer.

## GraphQL History

Created by Facebook in 2012, GraphQL was used internally for their mobile applications to reduce network usage due to slow mobile networks.

GraphQL is now supported by major programming languages, including Python, Java, C#, Javascript, Node.js, and more.

## The Good

- Make only 1 network call to bring back initial data
- Bring back only the data we care about
- Some level of documentation built in (data model & available queries)
- Validation and type checking out-of-the-box

## The Bad

- Web caching complexity since all requests use the same endpoint
- Performance issues with complex queries especially with nested fields
- Complexity

- Performance issues with complex queries especially with nested fields
- Web caching complexity
- This leads us to the final disadvantage: complexity. If you have a simple REST API and deal with data that is relatively consistent over time, you would be better off sticking with your REST API. For companies that deal with rapidly-changing data, and have the engineering resources to devote to rearchitecting their API platforms, GraphQL can solve many of the pain points experienced with REST APIs. (https://stablekernel.com/article/advantages-and-disadvantages-of-graphql/)


## Why Not Rest

- REST has a bunch of endpoints which return static data structures and relies on good documentation
- REST APIs frequently under or over fetch data which leads to additional calls or extra data transfer
- GraphQL allows front end and back end developers can work independently

## GraphQL Building Blocks

- *Schema*: The contract for client-server communication
- *Queries or Mutations*: Clients send these to specify a request for the data they need or to modify data
- *Resolvers*: Every field has a resolver function, which specifies how that field is connected to the back end and fetches data for that field

## Schema

## Queries

## Mutations

## Resolvers

## Demo

-


## Resources

- [REST today](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#rest-today)
- [Problems with REST](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/#problems-with-rest)
- https://hackernoon.com/3-minute-introduction-to-graphql-2c4e28ed528
- https://thenewstack.io/introduction-to-graphql/

