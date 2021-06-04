let users = [
    {
        id: 0,
        name: 'August',
        city: 'Burlington',
        state: 'VT',
        followers: [1,2],
        posts: [
            {
                id: 0,
                title: "Hello World",
            },
            {
                id: 1,
                title: "Foo to the Bar",
            },
        ]
    },
    {
        id: 1,
        name: 'Bailey',
        city: 'Arlington',
        state: 'VA',
        followers: [0],
        posts: [
            {
                id: 0,
                title: "Title 1",
            },
            {
                id: 1,
                title: "Title 2",
            },
        ]
    },
    {
        id: 2,
        name: 'Cameron',
        city: 'Bethesda',
        state: 'MD',
        followers: [0],
        posts: [
            {
                id: 0,
                title: "Post 1",
            },
            {
                id: 1,
                title: "Post 2",
            },
        ]
    },
];

module.exports = users;