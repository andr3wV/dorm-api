const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var userSchema = new Schema ({
	//define what the data inputs should be here (aka the Schema)!
	firstName: String, 
	lastName: String, 
	university: String, 
	address: String, 
	classYear: Number, 
	email: String,
	phoneNumber: String, //String b/c Number ignores any leading zeros 
	phoneProvider: String, 
	venmo: String , 
	isAdmin: Boolean,  
	isSuperAdmin: Boolean, 
	hash: String, 
	creationDate: Date
	}, 
	{
        toObject: { getters: true },

	//changes the names of mongoose defualt timestamps -- easier to read/remember
        timestamps: {
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        },
    }

);

//runs code before we save 
userSchema.pre('save', function(callback){
	//run hook code
 	if(this.isAdmin){ 
		if(!this. hash && !this.password){
			throw new Error("Password required for Admnins");
		}
		this.hash = this.hash || this.password;
	
	// TODO hash the password 
	
	} 
	//non-admin requirements
	else{
		if (!this.phone){
			throw new Error('Missing Phone');
		}
		
		// TODO check that phone number is real 

        	if (!this.phoneProvider){
			throw new Error ('Missing Phone Provider');
		}	
	}

	callback() 
});


//create any methods
userSchema.methods.greet = function(){
	console.log('hi');
};

// TODO create method to check hashed password

userSchema.methods.checkPassword = function(pw){
	return  this.hash===pw; 
}

var User = mongoose.model('User', userSchema);

module.exports = User; 
