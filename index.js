const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
const user = [];
app.get("/user", (req, res) => {
  res.json(user);
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: user.length + 1, name, email };
  user.push(newUser);
  res.json({ message: "USer Add Successfully", newUser });
});

app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const users = user.find((u) => u.id === id);
  if (!users) return res.json({ message: "no record Found" });
  res.json(users);
});

app.put("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const users = user.find((u) => u.id === id);
  if (!users)
    return res.json({ message: "no record Found or Worng ID Provided" });
  users.name = req.body.name || users.name;
  users.email = req.body.email || users.email;
  res.json(users)
});

app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const Index = user.findIndex((u) => u.id === id);
  if (Index === -1)
    return res.json({ message: "no record found or Wrong id is Provide" });
  const deleteUser = user.splice(Index,1)
  res.json({message:'data deleted',user,users:deleteUser[0]
  })
});

app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
