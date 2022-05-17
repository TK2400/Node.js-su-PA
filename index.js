    // //Sukurti  kelis userius
    // // sukurti komentaru libraray

    const express = require('express');
    const app = express();


    const users = [{
            id: 1,
            name: "John",
            lastName: "Den",
            email: "jd@abs.tt"
        },
        {
            id: 2,
            name: "Tom",
            lastName: "Petty",
            email: "tp@rock.tt"
        },
        {
            id: 3,
            name: "Rick",
            lastName: "Star",
            email: "rk@rock.tt"
        }
    ]

    // console.log(users[1].userId)

    const comments = [{
            commentId: 1,
            userId: 1,
            subject: "js",
            text: "comment 1, user1"
        },
        {
            commentId: 2,
            userId: 2,
            subject: "js",
            text: "comment 2, user 2"
        },
        {
            commentId: 3,
            userId: 2,
            subject: "js",
            text: "comment 3, user 2"
        },
        {
            commentId: 4,
            userId: 3,
            subject: "js",
            text: "comment 4, user 3"
        },
        {
            commentId: 5,
            userId: 1,
            subject: "js",
            text: "comment 5, user 1"
        },
        {
            commentId: 6,
            userId: 3,
            subject: "jasdas",
            text: "comment 6, user 3"
        }

    ]


    app.listen(3000, () => {
        console.log(`Serveris paleistas. Laukia užklausų`);
    });

    app.get('/users', (request, response) => {
        response.send(users)

    })

    app.get('/comments', (request, response) => {
        response.send(comments)

    })

    // istrauks objekta su  useriu duomenmis ir jo parasytus komentarus masyve tame objekte
    // Tomo atkartotas sprendimas neziurejus
    app.get('/users/:id', (req, resp) => {
        const userId = Number(req.params.id)
        const userToFind = users.find(user => user.id === userId)

        const userComments = comments.filter(comment => comment.userId === userId)

        resp.send({...userToFind, comments: userComments })


    })



    // istrauks komentaro objekta pagal komentaro ID ir prides dar user duomenis;
    // nepakeiciant originaliu duomenu objektu ir masyvu
    // Tomo atkartotas sprendimas issiaikinus koda
    app.get('/comments/:id', (request, response) => {

        const comment = comments.find(comment => comment.commentId === Number(request.params.id))
        const userData = users.find(user => user.id === comment.userId)
        response.send({...comment, wroteByUser: `${userData.name} ${userData.lastName}`, email: userData.email })
    })