var consts = require('./consts'),
	mongoose = require('mongoose'),
	userSchema = require('./1_define_schema');
mongoose.connect(consts.MLAB_KEY);
mongoose.Promise = global.Promise;
var conn = mongoose.connection;
var user = conn.model('user', userSchema);

conn.on('error',
	(err) =>{
		console.log(`connection error: ${err}`);
	});

conn.once('open',
	() =>{
		/*user.find({age:{$gt:10,$lt:30},Status:{$in:["A","B"]}},
			(err,user) => {
				if (err)
					console.log(`query error: ${err}`);
				console.log(user);
			});*/

			/*var newUser = new user({
				name: "Nimrod",
				Age: 30,
				Status: 'B',
				Groups:["Stam", "od", "grouo"]
			});
			newUser.save(
				(err) => {
					if(err)
						console.log(err);
					else
						console.log('saved');
				});*/
			
			/*var conditions = {age:{$gt:28,$lt:40}},
				update = {'Status':'C'},
				opts = {multi:true};

			user.update(conditions,update,opts,
				(err) => {
					if (err)
						console.log(err);
					else
						console.log('updated');
				});*/
			var conditions = {name:'Nimrod'};
			user.remove(conditions,
				(err) => {
					if (err)
						console.log(err);
					else
						console.log('removed');
				});
	});