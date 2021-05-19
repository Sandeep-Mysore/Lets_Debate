const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_FACTOR = 1;

const UserSchema = new Schema(
	{
		first_name:{type:String},
 		last_name:{type:String},
		password:{type:String},
		email_id:{type:String, unique:true},
		preferences:{type:Array},
		debate_id_liked:{type:Array},
		comments_id_liked:{type:Array}
	},
	{versionKey: false}
);
module.exports = mongoose.model("User",UserSchema);


UserSchema.methods.name = function() {
  return this.displayName || this.username;
};


// Encrypting the password
UserSchema.pre("save", function(done) {
	var user = this;
	if (!user.isModified("password")) {
	return done();
	}

	bcrypt.hash(user.password, 10, (err, hash) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(hash)
	user.password = hash;
	console.log(user);
	done();
	})

});

// checking password function
UserSchema.methods.checkPassword = function(guess, done) {
	console.log("chhecking pass");
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// Export model
