const mongoose = require('mongoose'); // connects to the data base
const Schema = mongoose.Schema // connects model to  database in mongo etc...

//Making the user
const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    image: {type: String, default: "http://www.refreshmiami.com/wp-content/uploads/2017/06/55085_logo-ironhack.png"},
    description: {type: String, default: "share your story"},
    role: {type: String, default: "guest"},
    stats: {type: String, default: "win: 0, lose: 0"},
    tournaments: [{type: Schema.Types.ObjectId, default:[], ref: 'Tournament'}],

    //As well as the create a team route and create a tournament route
    //Will reference Giannini's PizzaBox to determine the objectId linking between creator and creation
    //Will ask Nick/Manny regarding relationship between members AFTER we have the creators setup.
    //Will reference private
    tournamentAdminOf: [{ type: Schema.Types.ObjectId, ref: 'Tournament'}], //for this, just add tournament admin page via ngif and query database for tournaments with admin id = yours
    // tournamentMemberOf: [{ type: Schema.Types.ObjectId, ref: 'Tournament' }], //For now, part of the team. And the TEAM is in the tournament
    teamCaptainOf: [{ type: Schema.Types.ObjectId, ref: 'Team' }], //If they make a team, we 
    teamMemberOf: [{ type: Schema.Types.ObjectId, ref: 'Team' }], //
    },
    { timestamps: true }
);
//Defining the user schema to use with outside. 
const User = mongoose.model("User", userSchema);//stating that User w/ capital u is going to be the model userSchem.

module.exports = User;
