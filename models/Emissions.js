const mongoose = require('mongoose');

const EmissionsSchema = new mongoose.Schema({
    
    state : {
		type: String
	},

	emissions : [
		{
			year	: {
				type     : Number,
				required : true
			},
			
			amount   : {
				type     : Number,
				required : true
	        }
        }
	]
    
});

module.exports = mongoose.model('emissions', EmissionsSchema);
