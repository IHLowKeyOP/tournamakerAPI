const mongoose = require('mongoose'); 
const Schema = mongoose.Schema        

const tournamentSchema = new Schema({
    tournamentName:             {type:  String, default: "some random team"},
    tournamentDescription:      {type:  String, default: "share your story"},
    tournamentAdministrator:    {type:  Schema.Types.ObjectId, ref: "User"},
    numberOfTeams:              {type:  Number, default: 2},
    teams:                      [{type: Schema.Types.ObjectId, ref: "Team"}],
    playerPool:                 [{type: Schema.Types.ObjectId, ref: "User"}],
    winnerCondition:            {type:  Boolean, default: false},
    winner:                     [{type: Schema.Types.ObjectId, ref: "Team"}],
    tournamentType:             {type:  String, default: "insert tournament type"},
    rules:                      {type:  String, default: "insert tournament rules"}
    },
    { timestamps: true }
);

const Tournament = mongoose.model("Tournament", tournamentSchema);
module.exports = Tournament;