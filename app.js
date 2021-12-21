const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const bcrypt = require ('bcrypt');
const methodOverride = require("method-override");
const Ambassador = require("./models/ambassador");
const saltRounds = 10;
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

var c1 = 0;
var c2 = 0;
var c3 = 0;
var c4 = 0;
var c5 = 0;
var password='Kreiva@)@@';
var hashpass;
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(password, salt, function(err, hash) {
    hashpass=hash;
    console.log(hash);
  });
});

app.get("/", async (req, res) => {
  const ambasinfos = await Ambassador.find();

  c1=0;c2=0;c3=0;c4=0;
  for (i = 0; i < ambasinfos.length; i++) {
    if (ambasinfos[i].college == "IIT Bhuvneshwar") {
      c1++;
    }
  }
  for (i = 0; i < ambasinfos.length; i++) {
    if (ambasinfos[i].college == "IIIT Vadodara") {
      c2++;
    }
  }
  for (i = 0; i < ambasinfos.length; i++) {
    if (ambasinfos[i].college == "IIIT Diu") {
      c3++;
    }
  }
  for (i = 0; i < ambasinfos.length; i++) {
    if (ambasinfos[i].college == "Nirma") {
      c4++;
    }
  }

  console.log(c2);

  res.render("pages/homepage.ejs", { ambasinfos });
});

app.get("/register", (req, res) => {
  res.render("pages/register.ejs");
});

app.get("/adminLogin", async (req, res) => {
  res.render("pages/adminLogin.ejs");
});

app.get("/updateRef", async(req, res) => {
  const ambasinfos = await Ambassador.find();
  res.render("pages/updateRef.ejs", { ambasinfos });
});

app.post("/registration", async (req, res) => {
  const { username, mail, college, contact } = req.body;
  const ambassador = new Ambassador({
    name: username,
    mail: mail,
    college: college,
    contact: contact,
  });

  if (ambassador.college == "IIT Bhuvneshwar" && c1 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c1 = c1 + 1;
    console.log(c1);
    res.redirect(`/`);
  }
  else if (ambassador.college == "IIIT Vadodara" && c2 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c2 = c2 + 1;
    console.log(c2);
    res.redirect(`/`);
  }
  else if (ambassador.college == "IIIT Diu" && c3 <= 3) {
    await ambassador.save();

    console.log(ambassador);
    c3 = c3 + 1;
    console.log(c3);
    res.redirect(`/`);
  }
  else if (ambassador.college == "Nirma" && c1 <= 4) {
    await ambassador.save();

    console.log(ambassador);
    c4 = c4 + 1;
    console.log(c4);
    res.redirect(`/`);
  } else {
    res.redirect(`/register`);
  }
});

app.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body;
  if(username == 'kreiva@2022')
  {
  bcrypt.compare(password, hashpass, function(err, result) {
    if (result) {
      res.redirect("/updateRef");
    }
    else {
      res.redirect("/adminLogin");
    }
  });

}
  
  
  // if (username == 'kreiva@2022' && password == 'Kreiva@)@@')
  // {
  //   res.redirect("/updateRef");
  // }
  // else{
  //   res.redirect("/adminLogin");
  // }
});

app.post("/updateRef", async (req, res) => {
  const ambasinfo = await Ambassador.find();
  const {p} = req.body;
  console.log(p);

  for (i = 0; i < ambasinfo.length; i++) 
  {
   ambasinfo[i].referals = p[i];
   await ambasinfo[i].save();
  }
  console.log(ambasinfo);

  res.redirect("/");
});

app.listen(8000, (req, res) => {
  console.log(`LISTENING TO PORT 8000!!`);
});
