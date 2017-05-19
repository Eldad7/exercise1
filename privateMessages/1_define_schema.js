var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	userSchema = new schema({
		user: {
				name: String, 
				id: Number},
		recieved:{
				date: String,
				time: String},
		content: {type:String, required:true}
	},{collection: 'messages'});
module.exports = userSchema;