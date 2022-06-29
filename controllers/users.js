var userDb = [];
var idCounter = 0;

userDb.insertUser = function(user, callback){
	user.id = idCounter;
	idCounter++;
	userDb.push(user); 
	
	callback();

}; 

userDb.getUserById = function(id, callback){

	for(var i=0, i<this.length, i++){
		if(this[i].id === + id){
			callback(this[i])
		}
	}
};




module.exports.createUser = function(req, res){
	
	var newUser = {
	firstName: req.body.firstName, 
	lastName: req.body.lastName, 
	email: req.body.email,
	password: req.body.password, 
	createdDate: new Date()

	}
	
	//stores user in userDb
	userDb.insertUser(newUser, function(){
		return res.send("New User Created!");
	});

};

module.exports.getUsers = function(req, res){

	return res.send(userDb);

};


module.exports.getUserById = function(req, res){
userDb.getUserById(req.params.id, function(user){
		return res.json(user);
	});

}
