const express = require("express");
const cors = require("cors");
const app = express();

// Import connection MongoDB
const DBFile = require("./connection");

// Import routes and model user file
const userRoute = require("./routes/user");

app.use(express.json());
app.use(cors());
// app.use(
// 	cors({
// 		origin: ["http://localhost:5000"],
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type", "Authorization"],
// 	})
// );

// app.use(function (req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Content-Type",
// 		"X-Requested-With"
// 	);
// 	next();
// });

// Import body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
	res.end("Welcome to the Node.js backend server. Running...");
});

// set up basic server
app.listen(5000, function () {
	console.log("The node server is running");
});
