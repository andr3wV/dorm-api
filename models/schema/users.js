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
	password: String, 
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

//runs before save -- hash if admin, ensure phone and provider if not
userSchema.pre('save', function(callback){
	//run hook code
 	if(this.isAdmin || this.isSuperAdmin){ 
		if(!this.email)
			return callback(new Error('Missing Email!'));
		if(!this. hash){
			return callback(new Error("Missing Password: Password required for admins"));
		}
		this.hash = this.hash || this.password;
	
	// TODO hash the password 
	
	} 
	//non-admin requirements
	else{
		if (!this.phone){
			return callback(new Error('Missing Phone'));
		}
        	if (!this.phoneProvider){
			return callback(new Error ('Missing Phone Provider'));
		}	
	}
	
	//validate phone
	if (this.phone){
		if(typeof this.phone !== 'string'){
			return callback(new Error('Invalid phone number'));
		}
		var phone = '';
		for(car i = 0; i<this.phone.length; i++){
			if(!isNan(this.phone[i])){
				phone += this.phone[i];
			}
		}
		if(phone.length !== 10){
			return callback(new Error('Invalid phone number'));
		}
		this.phone = phone; 
	}

	callback() 
});


//create any methods
userSchema.virtual('name').get(function() {
	var name = "";
	if (this.firstName) {
        	name = this.firstName;
        	if (this.lastName) {
			name += ' ' + this.lastName;
    		}

    } 
    else if (this.lastName) {
   	 name = this.lastName;
    }
    return name;
});

// TODO create method to check hashed password

userSchema.methods.comparePassword = function(pw){
	return  (this.hash===pw); 
}

var User = mongoose.model('User', userSchema);
	
module.exports = User; 
