const privateMessages = require('./../data/messages.json');

class Messages{
	constructor(){
		this.messages = [];
		this.addMessages();
	}

	addMessages(){
		for (let message of privateMessages)
			this.messages.push(message);
		this.sort(this.messages);
	}

	getAllMessages(){
		return this.messages;
	}

	getMessagesById(id){
		var userMessages = [];
		for (let message of this.messages)
			if (message.user.id == id)
				userMessages.push(message);
		this.sort(userMessages);
		return userMessages;
	}
	sort(userMessages){
		userMessages.sort(function (a,b){
			return (new Date(a.recieved.date + " " + a.recieved.time).getTime()) - (new Date(b.recieved.date + " " + b.recieved.time).getTime()) || a.user.id - b.user.id;
		});
	}

	getMessagesByUsername(username){
		var userMessages = [];
		for (let message of this.messages)
			if (message.user.name == username)
				userMessages.push(message);
		//this.sort(userMessages);
		return userMessages;
	}

	getUserMessagesFromDate(username,fromDate,toDate=null){	//toDate - Optional
		var from = new Date(fromDate);
		var flag = false;		//flag for if there is a toDate
		var userMessages = [];
		if (toDate!=null){
			flag = true;
			var to = new Date(toDate);
		}
		for (let message of this.messages){
			if (to){
				if (message.user.name == username && new Date(message.recieved.date).valueOf() >= from && new Date(message.recieved.date).valueOf() <= to)
					userMessages.push(message);
			}
			else{
				if (message.user.name == username && new Date(message.recieved.date).valueOf() >= from)
					userMessages.push(message);
			}
		}
		this.sort(userMessages);
		return userMessages;
	}

	getUserMessagesFromDate(id,fromDate,toDate=null){	//toDate - Optional
		var from = new Date(fromDate);
		var flag = false;		//flag for if there is a toDate
		var userMessages = [];
		if (toDate!=null){
			flag = true;
			var to = new Date(toDate);
		}
		for (let message of this.messages){
			if (to){
				if (message.user.id == id && new Date(message.recieved.date).valueOf() >= from && new Date(message.recieved.date).valueOf() <= to)
					userMessages.push(message);
			}
			else{
				if (message.user.id == id && new Date(message.recieved.date).valueOf() >= from)
					userMessages.push(message);
			}
		}
		this.sort(userMessages);
		return userMessages;
	}
}

module.exports = Messages;