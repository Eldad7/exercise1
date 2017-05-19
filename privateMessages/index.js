//const privateMessages = require('./../data/messages.json');
var consts = require('./consts'),
	mongoose = require('mongoose'),
	userSchema = require('./1_define_schema');
mongoose.connect(consts.MLAB_KEY);
mongoose.Promise = global.Promise;
var conn = mongoose.connection;
var user = conn.model('message', userSchema);

class Messages{
	constructor(){
		this.messages = [];
	}

	getAllMessages(){
		return user.find().sort({"recieved.date":1,"recieved.time":1}).exec().then(
			function(messages){
				if (messages.length==0)
					return {"000": 'No messages recieved yet!'};
				console.log(messages);
				return messages;
			});
	}

	getMessagesById(id){
		return user.find({'user.id': id}).sort({"recieved.date":1,"recieved.time":1}).exec().then(
			function(messages){
				if (messages.length==0)
					return {"error id": '001',"error message": "UserID don't exist"};
				console.log(messages);
				return messages;
			});
	}

	getMessagesByUsername(username){
		return user.find({'user.name': username}).sort({"recieved.date":1,"recieved.time":1}).exec().then(
			function(messages){
				if (messages.length==0)
					return {"error id": '002',"error message": "Username don't exist"};
				console.log(messages);
				return messages;
			});
	}

	/*
		* need to check the parameters that could be null - to update flags
		* the to_flag will be inside the for loop, username and id flags will be checked to decide the conditions
	*/

	getUserMessagesFromDate(id=null, username=null,fromDate,toDate=null, query){	//username, toDate - Optional 
		switch (query){
			case 1:
				return user.find({"user.id":id,"recieved.date": {"$gte": fromDate, "$lte": toDate}}).
					sort({"recieved.date":1,"recieved.time":1}).exec().then(
						function(messages){
							if (messages.length==0)
								return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
							console.log(messages);
							return messages;
						});
			case 2:
				return user.find({"user.id":id,"recieved.date": {"$gte": fromDate}}).
					sort({"recieved.date":1,"recieved.time":1}).exec().then(
						function(messages){
							if (messages.length==0)
								return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
							console.log(messages);
							return messages;
						});
			case 3:
				return user.find({"user.name":username,"recieved.date": {"$gte": fromDate, "$lte": toDate}}).
					sort({"recieved.date":1,"recieved.time":1}).exec().then(
						function(messages){
							if (messages.length==0)
								return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
							console.log(messages);
							return messages;
						});
			case 4:
				return user.find({"user.name":username,"recieved.date": {"$gte": fromDate}}).
					sort({"recieved.date":1,"recieved.time":1}).exec().then(
						function(messages){
							if (messages.length==0)
								return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
							console.log(messages);
							return messages;
						});
			case 5:
				return user.find({"recieved.date": {"$gte": fromDate, "$lte": toDate}}).
					sort({"recieved.date":1,"recieved.time":1}).exec().then(
						function(messages){
							if (messages.length==0)
								return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
							console.log(messages);
							return messages;
						});
			case 6:
				return user.find({"recieved.date": {"$gte": fromDate}}).sort({"recieved.date":1,"recieved.time":1}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages;
					});
		}

	}

}

module.exports = Messages;