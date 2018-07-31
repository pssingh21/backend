var express = require('express');
var router = express.Router();
var UserDetailsModel = require('./../models/userDetails');
var jwt = require('jsonwebtoken');

function decodeFn(req) {
    var decoded = jwt.decode(req.authorization, {
        complete: true
    });
    nameOfUser = decoded.payload.username;
    return nameOfUser;
}

module.exports = function() {
    router.get('/', function(req, res, next) {
        nameOfUser = decodeFn(req.headers);
        UserDetailsModel.find({}, function(err, skills) {
            if (err) {
                return next(err);
            } else {
                if (!skills[0]) {
                    res.json({
                        status: 204,
                        message: 'Skill not found'
                    });
                } else {
                    found = false;
                    mainId = skills[0]._id;
                    UserDetailsModel.findById(mainId, function(err, wholeData) {
                        if (err) {
                            return next(err);
                        }
                        wholeData.particularUser.forEach(function(item) {
                            if (item.username == nameOfUser) {
                                found = true;
                                res.json({
                                    status: 200,
                                    skills: item.skills
                                });
                            }
                        });
                        if (!found) {
                            res.json({
                                status: 204,
                                message: "Skills not Found"
                            });
                        }
                    });
                }
            }
        });
    });

    router.put('/add', function(req, res, next) {
        nameOfUser = decodeFn(req.headers);
        UserDetailsModel.find({}, function(err, skills) {
            if (err) {
                return next(err);
            } else {
                if (!skills[0]) {
                    var newSkills = new UserDetailsModel();
                    newSkills.particularUser.unshift({
                        skills: req.body.skills,
                        username: nameOfUser
                    });
                    console.log('skills', newSkills);
                    newSkills.save(function(err, done) {
                        if (err) {
                            return next(err);
                        }
                        res.json({
                            status: 200,
                            message: 'Skill added successfully.'
                        });
                    });
                } else {
                    found = false;
                    mainId = skills[0]._id;
                    UserDetailsModel.findById(mainId, function(err, wholeData) {
                        if (err) {
                            return next(err);
                        }
                        wholeData.particularUser.forEach(function(item) {
                            if (item.username == nameOfUser) {
                                found = true;
                                item.skills = item.skills + ',' + req.body.skills;
                            }
                        });
                        if (!found) {
                            wholeData.particularUser.push({
                                skills: req.body.skills,
                                username: nameOfUser
                            });
                        }
                        wholeData.save(function(err, saved) {
                            if (err) {
                                return next(err);
                            }
                            res.json({
                                status: 200,
                                message: 'Skill added successfully.'
                            });
                        });
                    });
                }
            }
        });
    });

    router.delete('/delete', function(req, res, next) {
        nameOfUser = decodeFn(req.headers);
        UserDetailsModel.find({}, function(err, skills) {
            if (err) {
                return next(err);
            } else {
                if (!skills[0]) {
                    res.json({
                        status: 204,
                        message: 'Skill not found'
                    });
                } else {
                    foundUser = false;
                    foundSkill = false;
                    mainId = skills[0]._id;
                    UserDetailsModel.findById(mainId, function(err, wholeData) {
                        if (err) {
                            return next(err);
                        }
                        wholeData.particularUser.forEach(function(item, index) {
                            if (item.username == nameOfUser) {
                                foundUser = true;
                                var skillArr = item.skills.split(",");
                                skillArr.forEach(function(thisSkill) {
                                    if (thisSkill == req.body.skills) {
                                        foundSkill = true;
                                        skillArr.splice(skillArr.indexOf(req.body.skills), 1);
                                        backToString = skillArr.toString();
                                        wholeData.particularUser[index].skills = backToString;
                                        wholeData.save(function(err, saved) {
                                            if (err) {
                                                return next(err);
                                            }
                                            res.json({
                                                status: 200,
                                                message: "Skill deleted successfully"
                                            });
                                        });
                                    }
                                });
                                if (!foundSkill) {
                                    res.json({
                                        status: 204,
                                        message: "Skill not Found"
                                    });
                                }
                            }
                        });
                        if (!foundUser) {
                            res.json({
                                status: 204,
                                message: "User not Found"
                            });
                        }
                    });
                }
            }
        });
    })
    return router;
}