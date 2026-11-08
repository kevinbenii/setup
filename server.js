const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Let the React site read the data
app.use(cors());

// Images and pages in the public folder
app.use(express.static("public"));

//testdb is name of database, it will automatically make it
mongoose
  .connect("mongodb+srv://kevinbeni326_db_user:Prowen$2006@kevinbeni.mtgqenx.mongodb.net/testdb?retryWrites=true&w=majority")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

const schema = new mongoose.Schema({
  name: String,
});

async function createMessage() {
  const result = await message.save();
  console.log(result);
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

createMessage();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
