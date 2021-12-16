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


var c1=0;
var c2=0;
var c3=0;
var c4=0;

app.get("/", async (req, res) => {
  const ambasinfos = await Ambassador.find();

  // for (ambasinfo of ambasinfos) {
  //   if (ambasinfo == "IIIT Vadodara") {
  //     c1++;
  //   }
  // }
  // console.log(c1);

  res.render("pages/homepage.ejs", { ambasinfos });
});

app.get("/register", (req, res) => {
  res.render("pages/register.ejs");
});

app.get("/admin", async (req, res) => {
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

  if (ambassador.college == "IIIT Vadodara" && c1 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c1=c1 + 1;
    console.log(c1);
    res.redirect(`/`);
  }
  if (ambassador.college == "IIT Bhuvneshwar" && c2 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c2=c2 + 1;
    console.log(c2);
    res.redirect(`/`);
  }
  if (ambassador.college == "IIIT Diu" && c3 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c3=c3 + 1;
    console.log(c3);
    res.redirect(`/`);
  }
  if (ambassador.college == "Nirma" && c1 <= 4) {
    await ambassador.save();

    console.log(ambassador);
    c4=c4 + 1;
    console.log(c4);
    res.redirect(`/`);
  } else {
    res.redirect(`/register`);
  }
});

app.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const persontoEdit = await Ambassador.findById(id);
  res.render("pages/update.ejs", { persontoEdit, id });
});

app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const personToEdit = await Ambassador.findById(id);
  const { referals } = req.body;
  personToEdit.referals = referals;
  await personToEdit.save();
  res.redirect("/admin");
});

app.listen(8000, (req, res) => {
  console.log(`LISTENING TO PORT 8000!!`);
});
