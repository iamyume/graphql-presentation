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
- Performance issues with complex queries especially with nested fields
- Diminishes shared nothing architecture. With a REST endpoint using different URLs, it's easy to point to different microservices via routing. With GraphQL, the server will need to handle that complexity.

## Why Not Rest

- REST has a bunch of endpoints which return static data structures and relies on producing good documentation.
- REST APIs frequently under or over fetch data which leads to additional calls or extra data transfer
- GraphQL allows front end and back end developers can work independently since there is an agreed upon data schema.

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

