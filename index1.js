const express = require('express');
const app = express();
const port = 3000

app.use(express.json())


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


app.get('/user/:id', (req, res) => {
    const user = users.find(user => user.userId === Number(req.params.id));
    if (!user) {
        res.send({});
    } else {
        const userComments = comments.filter(comment => comment.userId === user.userId);
        res.send({ ...user, comments: userComments });
    }
})

app.listen(port, () => {
    console.log(`Serveris paleistas su node. Laukia užklausų`);
});


app.post('/users', (req, res) => {
    const newUser = req.body
    if (users.find(user => user.email === newUser.email || user.id === newUser.id)) {
        return res.send("user su tokiais pata duomenis jau yra")
    }
    else {
        users.push({ ...newUser, id: new Date().getTime() })
        return res.send("naujas useris pridetas")
    }

})


app.get('/users', (request, response) => {
    console.log(response.send(users))
})