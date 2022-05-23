const express = require('express');
const res = require('express/lib/response');
const app = express();
const port = 3000

app.use(express.json())


let users = [{
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


let comments = [{
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

function serverStart() {
    console.log("Server started...");
}

app.listen(port, serverStart);


function getUsers(request, response) {
    response.send(users);
}
app.get("/users", getUsers);


function getComments(request, response) {
    response.send(comments);
}
app.get("/comments", getComments);


//   app.get("*", callCallback);

function createUser(request, response) {
    const newUser = request.body;
    users.push({ ...newUser, id: new Date().getTime() });
    response.send(users);
}
app.post("/user", createUser);

function updateUser(request, response) {
    const updatingUserId = Number(request.params.userId)
    const oldUserIndex = users.findIndex(user => user.id === updatingUserId)
    const newUserInfo = request.body
    if (oldUserIndex > -1) {
        users[oldUserIndex] = { ...users[oldUserIndex], ...newUserInfo }
        response.send(users)

    }
    else {
        response.send("tokio vartotojo nera");
    }
}


app.put("/user/:userId", updateUser)

function deleteUserAndUserComments (request, response) {
    users = users.filter(user => user.id !== Number(request.params.userId))
   comments = comments.filter(comment =>comment.userId !==Number(request.params.userId))
   
    response.send({users, comments})
}

app.delete("/user/:userId", deleteUserAndUserComments)

