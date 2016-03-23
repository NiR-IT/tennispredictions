 'use strict';

 app.factory('Prediction', function(FURL, $firebase, Auth, toaster) {

 	var ref = new Firebase(FURL);
 	var predictions = $firebase(ref.child('predictions')).$asArray();
 	var user = Auth.user;

 	var Prediction = {

 		all: predictions,

 		getPrediction: function(predictionId) {
 			return $firebase(ref.child('predictions').child(predictionId));
 		},

 		createPrediction: function(prediction) {
 			prediction.datetime = Firebase.ServerValue.TIMESTAMP;
 			return predictions.$add(prediction);
 		},

 		editPrediction: function(prediction) {
 			var t = this.getPrediction(prediction.$id);
 			return t.$update(
 				{
 					player1: prediction.player1,
 					player2: prediction.player2,
 					winner: prediction.winner,
 					venue: prediction.venue,
 					date: prediction.date,
 					round: prediction.round,
 					description: prediction.description,
 					odd: prediction.odd,
 					score: prediction.score
 				}
 			);
 		},

 		cancelPrediction: function(predictionId) {
 			var t = this.getPrediction(predictionId);
 			return t.$update({status: "cancelled"});
 		},

 		wonPrediction: function(predictionId) {
 			var t = this.getPrediction(predictionId);
 			return t.$update({status: "won"});
 		},

 		lostPrediction: function(predictionId) {
 			var t = this.getPrediction(predictionId);
 			return t.$update({status: "lost"});
 		},

 		backPrediction: function(predictionId) {
 			var t = this.getPrediction(predictionId);
 			return t.$update({status: "moneyback"});
 		},

 		processPrediction: function(predictionId) {
 			var t = this.getPrediction(predictionId);
 			return t.$update({status: "open"});
 		},

 		isCreator: function(prediction) {
 			return (user && user.provider && user.uid === prediction.poster);
 		},

 		isOpen: function(prediction) {
 			return prediction.status === "open";
 		}
 	};

 	return Prediction;

 });