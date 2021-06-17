let users = [
    {
        id: 0,
        name: 'August',
        city: 'Burlington',
        state: 'VT',
        followers: [1,2],
    },
    {
        id: 1,
        name: 'Bailey',
        city: 'Arlington',
        state: 'VA',
        followers: [0],
    },
    {
        id: 2,
        name: 'Cameron',
        city: 'Bethesda',
        state: 'MD',
        followers: [0],
    },
];

let posts = [
    {
        id: 0,
        authorId: 0,
        title: "Hello World",
    },
    {
        id: 1,
        authorId: 0,
        title: "Foo to the Bar",
    },
    {
        id: 2,
        authorId: 1,
        title: "Title 1",
    },
    {
        id: 3,
        authorId: 1,
        title: "Title 2",
    },
    {
        id: 4,
        authorId: 2,
        title: "Post 1",
    },
    {
        id: 5,
        authorId: 2,
        title: "Post 2",
    },
];

module.exports = {
    users,
    posts,
};