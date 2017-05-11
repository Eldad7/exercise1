'use strict'
const express = require ('express'),
	  bodyParser = require('body-parser'),
	  app = express(),
	  port = process.env.PORT || 3000,
	  data = require('./data/messages.json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.all('*',
		(req, res, next) => {
			console.log("runs for all HTTP verbs first");
			next();
		});*/

/*app.get('/getMusicName/:music_id',
	(req,res) => {
		var music_id = req.params.music_id;
		console.log(`get: ${req.params.music_id}`);
		res.status(200).json({"music-name":data.name});
	});

app.put('/products/:prod_id',
	(req,res) => {
		x`console.log('put: ${req.params.prod_id}');
		res.json({prod_id: req.params.prod_id});
	});


app.post('/savemusic/',
	(req,res) => {
		var songs = req.body.songs;
		console.log(`post: ${req.body.songs}`);
		res.json({'success': 1});
	});*/

app.listen(port,
	() => {
			console.log(`listening on port ${port}`);
	});