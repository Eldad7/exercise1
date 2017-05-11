'use strict'
const express = require ('express'),
	  bodyParser = require('body-parser'),
	  app = express(),
	  port = process.env.PORT || 3000,
	  privateMessages = require('./privateMessages/');
var messages = new privateMessages();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('*',
		(req, res, next) => {
			console.log("runs for all HTTP verbs first");
			next();
		});

app.get('/allMessages',
	(req,res) => {
		console.log(`get: all messages`);
		res.status(200).json(messages.getAllMessages());
	});


app.post('/userMessages_id/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_id}`);
		res.status(200).json(messages.getMessagesById(req.body.user_id));
	});

app.post('/userMessages_name/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_name}`);
		res.status(200).json(messages.getMessagesByUsername(req.body.user_name));
	});

app.listen(port,
	() => {
			console.log(`listening on port ${port}`);
	});