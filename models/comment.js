const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		pro_con:{type:Boolean},
		comment:{type:String},
		debate_id:{type:Number},
		comment_id:{type:Number, unique:true},
		user_email_id:{type:String},
		likes:{type:Number}

	},
	{versionKey: false}
);
module.exports = mongoose.model("Comment",CommentSchema);
