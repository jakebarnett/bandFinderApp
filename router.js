var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./user_model');


module.exports = function (app) {
	app.use(bodyparser.json());

	app.post('/create_user', function(req, res){
		var newUser = new User();
		newUser.basic.email = req.body.email;
		newUser.basic.password = req.body.password;
			newUser.userName = req.body.userName;
			newUser.firstName = req.body.firstName;
			newUser.location = req.body.location;
			newUser.instruments = req.body.instruments;
			newUser.bio = req.body.bio;
			newUser.save(function(err, user) {
			  if (err) return res.status(500).send({msg: 'could not create user'});
			});
		res.send("success");
	});

	app.delete('/delete_user/:id', function (req, res){
		User.remove({_id: req.params.id}, function(err, User) {
			if (err) return res.status(500).send({'msg': 'could not delete user'});
			res.json(null);
		});
		
	});

	app.get('/show_matches/:id', function (req,res){
		User.find({_id: req.params.id, likedUsers: req.params.likedUsers}, function(err, data) {
			if (err) return res.status(500).send({'msg' : 'could not find liked users'})
			res.json(data);
		});
	});
};

/*
app.get('/show_new_user', function(req, res) {

});

app.post('/approve' function (req, res) {
	
});
*/
