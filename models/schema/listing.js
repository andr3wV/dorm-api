//an object of a listing that a user will send to the website

const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var listingSchema = new Schema ({
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

listingSchema.pre('save', function(callback){
	//run hook code
 	if(!this.availability){
		this.availability = true;  
	}
	// ensure url starts with http://, https://, ftp://
    if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url))){
        this.url = 'http://' + this.url;
    }
    
	callback();
});
couponSchema.pre('save', function(callback) {
    // ensure url starts with http://, https://, ftp://
    if (this.url && !(/^((https?)|(ftp)):\/\/.+/.test(this.url)))
        this.url = 'http://' + this.url;
    // update startDate on approval
    if (this.isModified('approvedDate') && this.approvedDate > this.startDate)
        this.startDate = this.approvedDate;

    callback();
});


var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing; 
