const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DebateSchema = new Schema(
	{
		title:{type:String},
		topic:{type:Array},
		debate_id:{type:Number, unique:true},
		posting_date:{type:Date},
		user_email_id:{type:String},
		likes:{type:Number}
	},
	{versionKey: false}
);
module.exports = mongoose.model("Debate",DebateSchema);
