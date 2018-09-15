// Dependency
var mongoose = require("mongoose");

// Creates Schema class
var Schema = mongoose.Schema;

// Creates NotesSchema
var CommentsSchema = new Schema({
	title: {
	    type: String
	},
	body: {
	    type: String
	}
});

// Creates Comments model
var comments = mongoose.model("Comments", CommentsSchema);

// Exports Comments model
module.exports = comments;


