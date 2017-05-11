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
		if (userMessages.length==0)
			return {"error id": '001',"error message": "UserID don't exist"};
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
		if (userMessages.length==0)
			return {"error id": '002',"error message": "Username don't exist"};
		this.sort(userMessages);
		return userMessages;
	}

	/*
		* need to check the parameters that could be null - to update flags
		* the to_flag will be inside the for loop, username and id flags will be checked to decide the conditions
	*/

	getUserMessagesFromDate(id=null, username=null,fromDate,toDate=null){	//username, toDate - Optional 
		var from = new Date(fromDate).getTime();
		var to;
		var flag_id = false, flag_username = false, flag_to = false;		//flags for parameters that might be null
		var userMessages = [];
		if (fromDate==null){
			return {"error id": '005',"error message": "Wrong parameters - From can't be null"};
		}
		if (id!=null)
			flag_id=true;
		if (username!=null)
			flag_username=true;
		if (toDate!=null){
			flag_to = true;
			to = new Date(toDate).getTime();	
			if (from>=to)
				return {"error id": '006',"error message": "Wrong parameters - From date can't be greater than to date"};
		}
		if (flag_username==true){
			for (let message of this.messages){
				if (flag_to){
					if (message.user.id == id && new Date(message.recieved.date).getTime() >= from && new Date(message.recieved.date).getTime() <= to)
						userMessages.push(message);
				}
				else{
					if (message.user.id == id && new Date(message.recieved.date).getTime() >= from);
						userMessages.push(message);
				}
			}
		}
		else if (flag_id){
			for (let message of this.messages){
				if (flag_to){
					if (message.user.id == id && new Date(message.recieved.date).getTime() >= from && new Date(message.recieved.date).getTime() <= to)
						userMessages.push(message);
				}
				else{
					if (message.user.id == id && new Date(message.recieved.date).getTime() >= from)
						userMessages.push(message);
				}
			}
		}
		else{
			for (let message of this.messages){
				if (flag_to){
					if (new Date(message.recieved.date).getTime() >= from && new Date(message.recieved.date).getTime() <= to)
						userMessages.push(message);
				}
				else{
					if (new Date(message.recieved.date).getTime() >= from)
						userMessages.push(message);
				}
			}
		}
		if (userMessages.length==0)
			return {"error id": '004',"error message": "No messages between chosen dates"};
		this.sort(userMessages);
		return userMessages;
	}

}

module.exports = Messages;