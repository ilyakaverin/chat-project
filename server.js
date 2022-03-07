const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

const db = new Map();
app.use(express.json());

app.get("/rooms/:id", (request, response) => {
  const { id: roomId } = request.params;
  const object = db.has(roomId)
    ? {
        users: [...db.get(roomId).get("users").values()],
        messages: [...db.get(roomId).get("messages").values()],
      }
    : { users: [], messages: [] };
  response.json(object);
});
app.post("/rooms", (request, response) => {
  const { roomId, username } = request.body;

  if (!db.has(roomId)) {
    db.set(
      roomId,
      new Map([
        ["users", new Map()],
        ["messages", []],
      ])
    );
  }
  response.send();
});

io.on("connection", (socket) => {
  socket.on("room join", ({ roomId, username }) => {
    socket.join(roomId); // joining exact room
    db.get(roomId).get("users").set(socket.id, username);
    const users = [...db.get(roomId).get("users").values()];
    socket.to(roomId).emit("room SET_USERS", users); //  notify about connection all except me (broadcast)
  });
  socket.on("room NEW_MESSAGE", ({ roomId, username, text }) => {
    const object = { username, text };
    db.get(roomId).get("messages").push(object);
    socket.to(roomId).emit("room NEW_MESSAGE", object);
  });
  console.log("socket connected", socket.id);
  socket.on("disconnect", () => {
    db.forEach((value, roomId) => {
      if (value.get("users").delete(socket.id)) {
        const users = [...db.get(roomId).get("users").values()];
        socket.broadcast.to(roomId).emit("room SET_USERS", users);
      }
    });
  });
});

server.listen(9999, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log("Поехали!");
});
