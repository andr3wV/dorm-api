//an object of a listing that a user will send to the website

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var userSchema = new Schema ({
	//define what the data inputs should be here (aka the Schema)!
	id: {type: Number, required: true}, 
	name: {type: String, required: true}, 
	description: String,
	url: {type: String, required: true}
	price: {type: Number, required: true},
	tags: [String],
	postedBy: {type: Schema.ObjectId, required: true}, 
	imageURL: String, 
	condition; String, 
	approvedDate: Date, 
	availability:  Boolean
	}, 
	{
        toObject: { getters: true },
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        },
    }

);

userSchema.pre('save', function(callback){
	//run hook code
 	if(!this.availability){

	this.availability = true;  

	}

	callback();
});

//create any methods
userSchema.methods.greet = function(){
	console.log('hi');

};

var User = mongoose.model('User', userSchema);

module.exports = User; 
