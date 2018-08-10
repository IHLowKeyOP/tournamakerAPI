const express                 = require('express');
const teamRoutes              = express.Router();
const Team                    = require('../models/team');
const User                    = require('../models/user')
//===========================================>
const bcrypt                  = require('bcryptjs')
const session                 = require('express-session')
const passport                = require('passport')
const LocalStrategy           = require('passport-local').Strategy;
const flash                   = require('connect-flash');
const ensureLoggedIn          = require('connect-ensure-login').ensureLoggedIn;
//===========================================>

teamRoutes.post('/team/creation', /*ensureLoggedIn('/'),*/(req, res, next) => {
    const teamCaptain               = req.body.teamCaptain; 
    const teamName                  = req.body.teamName;
    const teamDescription           = req.body.teamDescription;
    const rosterInit                    = [];
    if (teamName.length < 3) {
        res.status(400).json({ message: 'Please make your team name should contain 3 or more characters' });
        return;
    } //closed
    Team.findOne({ teamName }, '_id', (err, foundTeam) => {
        if (foundTeam) {
            res.status(400).json({ message: 'The team name already exists' });
            return;
        } //closed
        const theTeam = new Team({
            teamCaptain:        teamCaptain,
            teamName:           teamName,
            teamDescription:    teamDescription,
            teamRoster:         rosterInit,
            // teamLogo: teamLogo,
            win: false,
            lose: false,
        }); //closed
        theTeam.save((err) => {
            if (err) {

                res.status(400).json({ message: 'Something went wrong' });
                return;
            }
            User.findByIdAndUpdate(theTeam.teamCaptain, {$addToSet:{teamCaptainOf:theTeam._id}})
                .then((whatHasBeenDone)=>{
                console.log("User now has object id of the tournament");
                })
                .catch((err)=>{
                next(err);
                })

            res.json(theTeam)

           
            // console.log('it works')

        }); //theTeam.save 
    }); // team.findOne
}); // teamRoutes.post



teamRoutes.post('/team/update/:id', /*ensureLoggedIn('/'),*/(req, res, next) => {
    // const newMember = req.body.memberid;
    const teamId = req.params.id;
    console.log(req.body)
    const updatedTeam = {
        teamName:           req.body.teamName,
        teamLogo:           req.body.image,
        teamDescription:    req.body.teamDescription,
        win:                req.body.win, //ify
        lose:               req.body.lose, //ify
        //players
    } 
    Team.findByIdAndUpdate(teamId, updatedTeam)// we made .then for 3rd push since you  
        .then((response) => { 
            res.json(response)
        })                    
        .catch((err) =>{
            next(err);
        })
        //could only push 2 parms at one time

         

                        // manny version for pushing players 
    // Team.findByIdAndUpdate(teamId, {$push: {roster: newMember}})// we made .then for 3rd push since you  
    //     .then((response) => {                                       //could only push 2 parms at one time

    //         Team.findByIdAndUpdate(teamId, updatedTeam)
    //             .then((response)=>{
    //                 console.log(response);
    //                 res.json(response)
    //             })
    //             .catch((err) => {
    //                 next(err);
    //             })
    //     })
    //     .catch((err)=>{
    //     });
});

//DELETE Team
teamRoutes.delete('/team/delete/:id', /*ensureLoggedIn('/'),*/(req, res, next) => {
    const teamId = req.params.id;
    Team.findByIdAndRemove(teamId)
        .then((response) => { // look into difference between promises and callbacks*
            res.json(response)
        })
        .catch((err) => {
            next(err);
        })
})



// Thise route is display infromation when pulled from database /DB
teamRoutes.get('/team/details/:id', /*ensureLoggedIn('/'),*/(req, res, next) => {
    const teamId = req.params.id;
    Team.findById(teamId)
    .populate('teamCaptain') //this tells to MongoDB to search for the object id that's in teamcaptain
    .then((theTeam)=>{
        res.json(theTeam);
    })
    .catch((err)=>{
        res.json(err);
    })
});

// router.get('/api/profile/:id', (req, res, next) => {
//     Rides
//     .find({user: req.params.id}, (err, ride) => {
//       if(err) {return next(err); }
//     })
   
//     .populate('user')
//      .exec((err, ride) => {
//        if(err) {
//          res.status(500).json({ message: 'Could not find the recipe'});
//          return;
//        }
//        res.status(200).json(ride)
//      })
//    })

// teams list 
teamRoutes.get('/team/allteams', (req, res, next) => {
    console.log('YOU WANT ALL THE TEAMS, DONT YOU')
    Team.find()
    .then((allTeams)=>{
      res.json(allTeams);
    })
    .catch((err)=>{
      res.json(err);
    })
    
  });









module.exports = teamRoutes;