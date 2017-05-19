'use strict'
const express = require ('express'),
	  bodyParser = require('body-parser'),
	  app = express(),
	  port = process.env.PORT || 3000,
	  privateMessages = require('./privateMessages/');
var messages = new privateMessages();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/allMessages',
	(req,res) => {
		console.log(`get: all messages`);
		messages.getAllMessages().then(result => res.status(200).json(result));
	});


app.post('/userMessages_id/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_id}`);
		messages.getMessagesById(req.body.user_id).then(result => res.status(200).json(result));
	});

app.post('/userMessages_name/',
	(req,res) => {
		console.log(`get messages of: ${req.body.user_name}`);
		messages.getMessagesByUsername(req.body.user_name).then(result => res.status(200).json(result));
	});

app.post('/userMessages_date/',
	(req,res) => {
		var flag_id = false, flag_username = false, flag_to = false;		//flags for parameters that might be null
		console.log(`get messages of:${req.body.user_id}, ${req.body.user_name}, ${req.body.from_date}, ${req.body.to_date}`);
		if (req.body.user_id!=null && req.body.user_name!=null){
			res.status(200).json({"error id": '007',"error message": "Wrong parameters - Please use only id or username"});	
			return;
		}
		if (req.body.from_date==null){
			res.status(200).json({"error id": '005',"error message": "Wrong parameters - From can't be null"});
			return;
		}
		var from = new Date(req.body.from_date).getTime();
		if (req.body.user_id!=null)
			flag_id=true;
		if (req.body.user_name!=null)
			flag_username=true;
		if (req.body.to_date!=null){
			flag_to = true;
			var to = new Date(req.body.to_date).getTime();	
			if (from>=to){
				res.status(200).json({"error id": '006',"error message": "Wrong parameters - From date can't be greater than to date"});
				return;
			}
		}
		if (flag_id && flag_to)
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 1).then(result => res.status(200).json(result));
		else if (flag_id && !flag_to)
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 2).then(result => res.status(200).json(result));
		else if (flag_username && flag_to)
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 3).then(result => res.status(200).json(result));
		else if (flag_username && !flag_to)
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 4).then(result => res.status(200).json(result));
		else if (!flag_username && !flag_id && flag_to)
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 5).then(result => res.status(200).json(result));
		else
			messages.getUserMessagesFromDate(req.body.user_id,req.body.user_name, req.body.from_date, req.body.to_date, 6).then(result => res.status(200).json(result));
	});

app.all('*',
		(req, res, next) => {
			console.log("runs for all HTTP verbs last");
			res.status(200).send('Please refer to <a href=https://github.com/Eldad7/exercise1>API</a>');
			next();
		});



app.listen(port,
	() => {
			console.log(`listening on port ${port}`);
	});