require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Joi = require("joi");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// Let the React site read the data
app.use(cors());

// Read JSON sent to the server
app.use(express.json());

// Images and pages in the public folder
app.use(express.static("public"));

// Save uploaded images in public/images (time added so names never clash)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({ storage: storage });

//testdb is name of database, it will automatically make it
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

// Save a test message (errors won't crash the server)
async function createMessage() {
  try {
    const result = await message.save();
    console.log(result);
  } catch (err) {
    console.error("could not save message...", err.message);
  }
}

//this creates a Message class in our app
const Message = mongoose.model("Message", schema);
const message = new Message({
  name: "Hello World",
});

// K·AI tools
const tools = [
  {
    _id: 1,
    name: "Study",
    category: "Education and Research",
    description: "Turns notes into a study guide.",
    price: "Free to try",
    platform: "Web",
    link: "/study",
    img_name: "images/study.png"
  },
  {
    _id: 2,
    name: "Code Fixer",
    category: "Coding and Technology",
    description: "Checks your code.",
    price: "Free to try",
    platform: "Web",
    link: "/codefixer",
    img_name: "images/codefixer.png"
  },
  {
    _id: 3,
    name: "Task",
    category: "Business and Productivity",
    description: "Creates and organizes daily tasks.",
    price: "Free to try",
    platform: "Web",
    link: "/task",
    img_name: "images/task.jpg"
  },
  {
    _id: 4,
    name: "Write",
    category: "Writing and Creativity",
    description: "Helps you write.",
    price: "Free to try",
    platform: "Web",
    link: "/write",
    img_name: "images/write.png"
  },
  {
    _id: 5,
    name: "Practice",
    category: "Education and Research",
    description: "Makes quizzes for you.",
    price: "Free to try",
    platform: "Web",
    link: "/education",
    img_name: "images/practice.jpg"
  },
  {
    _id: 6,
    name: "Debugger",
    category: "Coding and Technology",
    description: "Finds bugs in your code.",
    price: "Free to try",
    platform: "Web",
    link: "/coding",
    img_name: "images/debugger.png"
  },
  {
    _id: 7,
    name: "Report",
    category: "Business and Productivity",
    description: "Writes reports for you.",
    price: "Free to try",
    platform: "Web",
    link: "/business",
    img_name: "images/report.png"
  },
  {
    _id: 8,
    name: "Creation",
    category: "Writing and Creativity",
    description: "Generates images and videos for you.",
    price: "Free to try",
    platform: "Web",
    link: "/writing",
    img_name: "images/creation.jpg"
  }
];

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World", project: "K-AI" });
});

// All tools
app.get("/api/tools", (req, res) => {
  res.json(tools);
});

// Category page for each category
const categoryLinks = {
  "Education and Research": "/education",
  "Coding and Technology": "/coding",
  "Business and Productivity": "/business",
  "Writing and Creativity": "/writing"
};

// Add a new tool
app.post("/api/tools", upload.single("img"), (req, res) => {
  const result = validateTool(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  if (!req.file) {
    res.status(400).send("Please choose an image for the tool.");
    return;
  }

  const tool = {
    _id: Math.max(0, ...tools.map((t) => t._id)) + 1,
    name: req.body.name.trim(),
    category: req.body.category,
    description: req.body.description.trim(),
    price: req.body.price.trim(),
    platform: req.body.platform.trim(),
    link: categoryLinks[req.body.category],
    img_name: "images/" + req.file.filename
  };

  tools.push(tool);
  res.status(200).send(tool);
});

// Rules for a tool (the React form uses the same rules)
const validateTool = (tool) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().trim().min(2).max(30).required(),
    category: Joi.string().valid(...Object.keys(categoryLinks)).required(),
    description: Joi.string().trim().min(5).max(120).required(),
    price: Joi.string().trim().min(2).max(30).required(),
    platform: Joi.string().trim().min(2).max(30).required()
  });

  return schema.validate(tool);
};

createMessage();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
