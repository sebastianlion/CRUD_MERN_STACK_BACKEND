const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	userId: String,
});

const ModelUser = mongoose.model("Users", userSchema);
module.exports = router;

// Example-test route
router.get("/example", (req, res) => {
	res.end("greetings from example route");
});

router.get("/adduser", (req, res) => {
	res.end("greetings from adduser route");
});

// Add users
router.post("/adduser", async (req, res) => {
	try {
		const newUser = new ModelUser({
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			userId: req.body.userId,
		});
		await newUser.save();
		res.status(200).end("User has been saved correctly");
	} catch (error) {
		console.error("Error saving user: ", error.res.data);
		res.status(500).end("Error saving user");
	}
});

// Get all users
router.get("/getusers", async (req, res) => {
	try {
		const docs = await ModelUser.find();
		res.send(docs);
	} catch (err) {
		console.error("Error getting users: ", err);
		res.status(500).end("Error getting users");
	}
});

// Get one user
router.post("/getuser", async (req, res) => {
	try {
		const validId = req.body.userId;
		const user = await ModelUser.find({ userId: validId });
		res.send(user);
	} catch (err) {
		console.error("Error getting user:", err);
		res.status(500).end("Error getting user");
	}
});

// update user
router.post("/updateuser", async (req, res) => {
	try {
		const updateUser = {
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
		};
		await ModelUser.findOneAndUpdate({ userId: req.body.userId }, updateUser);
		res.status(200).end("User has been update correctly");
	} catch (err) {
		console.error("Error updating user: ", err);
		res.status(500).end("Error updating user");
	}
});

// delete user

router.post("/deleteuser", async (req, res) => {
	try {
		await ModelUser.findOneAndDelete({ userId: req.body.userId });
		res.status(200).end("User has been delete correctly");
	} catch (err) {
		console.error("Error deleting user: ", err);
		res.status(500).end("Error deleting user");
	}
});
