const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Ambassador = require("./models/ambassador");

// Establishing MongoConnection
mongoose.connect("mongodb://localhost:27017/camambData");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
  console.log("DATABASE CONNECTED");
});

const app = express();
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async(req, res) => {
    const ambasinfos = await Ambassador.find();
  res.render("pages/homepage.ejs",{ambasinfos});
});

app.get("/register", (req, res) => {
  res.render("pages/register.ejs");
});

app.get("/admin", async(req, res) => {
    const ambasinfos = await Ambassador.find();
    res.render("pages/admin.ejs",{ambasinfos});
  });

  

app.post("/registration", async (req, res) => {
  const { username, mail, college, contact } = req.body;
  const ambassador = new Ambassador({
    name: username,
    mail: mail,
    college: college,
    contact: contact,
  });
  await ambassador.save();
  
  console.log(ambassador);
  res.redirect(`/`);
});

app.get("/update/:id", async(req,res)=>{
    const {id} = req.params;
    const persontoEdit = await Ambassador.findById(id);
    res.render("pages/update.ejs",{persontoEdit,id});
})

app.post("/update/:id", async(req,res)=>{
    const {id}=req.params;
    const personToEdit=await Ambassador.findById(id);
    const{referals}=req.body;
    personToEdit.referals=referals;
    await personToEdit.save();
    res.redirect("/admin");
})


app.listen(8000, (req, res) => {
  console.log(`LISTENING TO PORT 8000!!`);
});
