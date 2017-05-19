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
		return user.find().exec().then(
			function(messages){
				if (messages.length==0)
					return {"000": 'No messages recieved yet!'};
				console.log(messages);
				return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
			});
	}

	getMessagesById(id){
		return user.find({'user.id': id}).exec().then(
			function(messages){
				if (messages.length==0)
					return {"error id": '001',"error message": "UserID don't exist"};
				console.log(messages);
				return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
			});
	}

	getMessagesByUsername(username){
		return user.find({'user.name': username}).exec().then(
			function(messages){
				if (messages.length==0)
					return {"error id": '002',"error message": "Username don't exist"};
				console.log(messages);
				return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
			});
	}

	/*
		* need to check the parameters that could be null - to update flags
		* the to_flag will be inside the for loop, username and id flags will be checked to decide the conditions
	*/

	getUserMessagesFromDate(id=null, username=null,fromDate,toDate=null, query){	//username, toDate - Optional 
		switch (query){
			case 1:
				return user.find({"user.id":id,"recieved.date": {"$gte": fromDate, "$lte": toDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
			case 2:
				return user.find({"user.id":id,"recieved.date": {"$gte": fromDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
			case 3:
				return user.find({"user.name":username,"recieved.date": {"$gte": fromDate, "$lte": toDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
			case 4:
				return user.find({"user.name":username,"recieved.date": {"$gte": fromDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
			case 5:
				return user.find({"recieved.date": {"$gte": fromDate, "$lte": toDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
			case 6:
				return user.find({"recieved.date": {"$gte": fromDate}}).exec().then(
					function(messages){
						if (messages.length==0)
							return {"error id": '002',"error message": "Username incorrect or no messages for these dates"};
						console.log(messages);
						return messages.sort(function (a,b){return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;})
					});
		}

	}

}

module.exports = Messages;