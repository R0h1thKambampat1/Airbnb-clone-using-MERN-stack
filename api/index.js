const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const UserModel = require("./models/User");
const Places = require("./models/Places");
const Booking = require("./models/Booking");
const multer = require("multer");
const fs = require("fs");
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bdhsvblchvdshc4268rt8o2fb";

app.use(express.json()); //Using json parser
app.use(cookieParser()); //using cookie parser to parse cookies
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({ name: name, email: email, password: bcrypt.hashSync(password, bcryptSalt) });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const UserDoc = await User.findOne({ email });
  if (UserDoc) {
    const passOk = bcrypt.compareSync(password, UserDoc.password);
    if (passOk) {
      jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(UserDoc);
      });
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, id } = await User.findById(userData.id);
      res.json({ name, email, id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName
  });
  res.json(__dirname + "/uploads/" + newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let file of req.files) {
    const { path, originalname } = file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath);
  }
  res.json(uploadedFiles);
});
app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedPhotos, perks, checkin, checkout, extraInfo, description, price, guests } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placesDoc = await Places.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn: checkin,
      checkOut: checkout,
      price,
      maxGuests: guests
    });
    res.json(placesDoc);
  });
});
app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    const temp = await Places.find({ owner: id });
    res.json(temp);
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Places.findById(id));
});
app.put("/places/", async (req, res) => {
  const { token } = req.cookies;

  const { id, title, address, addedPhotos, description, perks, extraInfo, checkin, checkout, price, guests } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placesDoc = await Places.findById(id);
    if (userData.id === placesDoc.owner.toString()) {
      placesDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn: checkin,
        checkOut: checkout,
        price,
        maxGuests: guests
      });
      await placesDoc.save();
      res.json(placesDoc);
    }
  });
});

app.get("/places", async (req, res) => {
  res.json(await Places.find());
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, guests, name, phone, price } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    guests,
    name,
    phone,
    price,
    user: userData.id
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      throw err;
    });
});

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(4000);
