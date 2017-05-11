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
		res.status(200).send(messages.getAllMessages());
	});


app.post('/userMessages_id/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_id}`);
		res.status(200).send(messages.getMessagesById(req.body.user_id));
	});

app.post('/userMessages_name/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_name}`);
		res.status(200).send(messages.getMessagesByUsername(req.body.user_name));
	});

app.post('/userMessages_date/',
	(req,res) => {
		console.log(`get messages of:${req.body.user_id}, ${req.body.user_name}, ${req.body.from_date}, ${req.body.to_date}`);
		res.status(200).send(messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date));
	});



app.listen(port,
	() => {
			console.log(`listening on port ${port}`);
	});