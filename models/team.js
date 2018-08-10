const mongoose          = require('mongoose'); // connects to the data base
const Schema            = mongoose.Schema; // connects model to  database in mongo etc...
const User              = require('./user');
const Tournament        = require('./tournament');
const teamSchema = new Schema({
    teamCaptain:     { type: Schema.Types.ObjectId, ref: 'User'},//reffering to the User Schema hence capital U in User
    teamLogo:        {type: String, default: "http://www.refreshmiami.com/wp-content/uploads/2017/06/55085_logo-ironhack.png"},
    teamName:        {type: String, required: [true, 'The team name is required']},
    teamRoster:      [{type: Schema.Types.ObjectId, default:[], ref: 'User'}], //reffering to the User Schema hence capital U in User hence capital U in User 
    teamDescription: {type: String, default: "Tell us about your team"},
    tournaments:     [{type: Schema.Types.ObjectId, default: [], ref: 'Tournament'}],
    win:             {type: Boolean, default: false},
    lose:            {type: Boolean, default: false}
    },
    { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);//stating that User w/ capital u is going to be the model userSchem.
//      |
// this const states that Team with capital T is calling the team Schema/Model
module.exports = Team;
