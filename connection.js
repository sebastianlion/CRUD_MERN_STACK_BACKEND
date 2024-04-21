const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/crudmernstack");

const dbObject = mongoose.connection;
dbObject.on("connected", () => {
	console.log("Correct connection to MongoDB");
});
dbObject.on("error", () => {
	console.log("Error in the connection to MongoDB");
});

module.exports = mongoose;
